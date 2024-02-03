class Api::V1::Admin::BaseController < Api::V1::BaseController
  before_action :authenticate_admin!

  def authenticate_admin!
    cache_token = Rails.cache.read(cache_admin_logged_in_key)
    unless cache_token.present? && get_jwt_header_value == cache_token
      respond_with_json({ errors: ["Please sign in before continuing"] }, 400)
    end
  end

  def cache_admin_logged_in_key
    "admin_logged_token"
  end
end
