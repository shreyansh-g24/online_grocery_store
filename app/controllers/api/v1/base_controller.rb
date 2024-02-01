class Api::V1::BaseController < ApplicationController
  respond_to :json
  protect_from_forgery with: :null_session
  before_action :authenticate_user!

  def authenticate_user!
    unless warden.authenticate! && current_user.present?
      respond_with_json({ errors: ["Please sign in or sign up before continuing"] }, 400)
    end
  end

  def current_user
    @current_user ||= warden.user
  end

  def respond_with_json(data, status)
    render json: data, status: status
  end
end
