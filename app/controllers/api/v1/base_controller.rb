class Api::V1::BaseController < ApplicationController
  respond_to :json
  protect_from_forgery with: :null_session

  def respond_with_json(data, status)
    render json: data, status: status
  end

  protected

  def decode_token
    token = get_jwt_header_value

    @auth_payload = if token.present?
                      JWT.decode(token, jwt_secret)[0]
                    else
                      respond_with_json({ errors: ["Auth token not found"] }, :unauthorized)
                      nil
                    end
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

  def create_token(payload)
    JWT.encode(payload, jwt_secret, algorithm)
  end
end
