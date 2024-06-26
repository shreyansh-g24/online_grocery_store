class Api::V1::Customers::BaseController < Api::V1::BaseController
  before_action :authenticate_user!

  def authenticate_user!
    decode_token
    return if @auth_payload.nil?

    unless current_customer.present? && current_customer.jti == @auth_payload["jti"]
      respond_with_json({ errors: ["Please sign in or sign up before continuing"] }, :unauthorized)
    end
  end

  def current_customer
    @current_customer ||= Customer.find_by(id: @auth_payload["id"])
  end
end
