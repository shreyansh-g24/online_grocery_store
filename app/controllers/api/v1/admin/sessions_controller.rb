# frozen_string_literal: true

class Api::V1::Admin::SessionsController < Api::V1::Admin::BaseController
  skip_before_action :authenticate_admin!, only: :create

  def create
    respond_with_json({ errors: ["Email not found"] }, :not_found) && return if login_params[:email] != "admin@example.com"
    respond_with_json({ errors: ["Password is not correct"] }, :unauthorized) && return if login_params[:password] != "admin"
    login_admin
    respond_with_json({ message: "Logged in successfully" }, :ok)
  end

  def destroy
    Rails.cache.delete(cache_admin_logged_in_key)
    respond_with_json({ message: "Logged out successfully" }, :ok)
  end

  private

  def login_params
    params.require(:admin).permit(:email, :password)
  end

  def login_admin
    payload = { login_at: Time.zone.now.to_i }
    token = create_token(payload)
    response.set_header("authorization", token)
    Rails.cache.write(cache_admin_logged_in_key, token)
  end
end
