# frozen_string_literal: true

class Api::V1::Customers::SessionsController < Api::V1::Customers::BaseController
  skip_before_action :authenticate_user!

  def create
    @customer = Customer.find_by(email: login_params[:email])
    respond_with_json({ errors: ["Email not found"] }, :not_found) && return if @customer.nil?
    respond_with_json({ errors: ["Password is not correct"] }, :unauthorized) && return unless @customer.valid_password?(login_params[:password])
    login_customer
    respond_with_json({ message: "Logged in successfully" }, :ok)
  end

  def destroy
    decode_token
    @customer = Customer.find_by(id: @auth_payload["id"])

    if @customer&.jti == @auth_payload["jti"]
      update_customer_jti
      respond_with_json({ message: "Logged out successfully" }, :ok)
    elsif @customer.jti != @auth_payload["jti"]
      respond_with_json({ errors: ["Revoked token"] }, :unprocessable_entity)
    else
      respond_with_json({ errors: ["Customer not found"] }, :unprocessable_entity)
    end
  end

  private

  def login_params
    params.require(:customer).permit(:email, :password)
  end

  def login_customer
    uuid = update_customer_jti
    payload = { jti: uuid, id: @customer.id, login_at: Time.zone.now.to_i }
    token = create_token(payload)
    response.set_header("authorization", token)
  end

  def update_customer_jti
    uuid = Customer.generate_unique_uuid
    @customer.update! jti: uuid
    uuid
  end
end
