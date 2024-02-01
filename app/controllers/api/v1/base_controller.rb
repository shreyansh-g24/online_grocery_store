class Api::V1::BaseController < ApplicationController
  respond_to :json
  protect_from_forgery with: :null_session
  before_action :authenticate_user!

  def authenticate_user!
    decode_token

    unless current_customer.present? && current_customer.jti == @auth_payload["jti"]
      respond_with_json({ errors: ["Please sign in or sign up before continuing"] }, 400)
    end
  end

  def current_customer
    @current_customer ||= Customer.find_by(id: @auth_payload["id"])
  end

  def respond_with_json(data, status)
    render json: data, status: status
  end

  protected

  def decode_token
    token = get_jwt_header_value
    @auth_payload = JWT.decode(token, jwt_secret)[0]
  end

  def jwt_secret
    Rails.application.secrets.jwt[:secret_key]
  end

  def algorithm
    Rails.application.secrets.jwt[:algorithm]
  end

  def get_jwt_header_value
    request.get_header("HTTP_AUTHORIZATION")
  end
end
