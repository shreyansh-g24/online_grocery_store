ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"
require "minitest/reporters"
require 'simplecov'

Minitest::Reporters.use!
SimpleCov.start

module ActiveSupport  
  class TestCase
    include FactoryBot::Syntax::Methods

    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
    def login_admin
      payload = { login_at: Time.zone.now.to_i }
      create_token(payload)
    end

    def cache_admin_logged_in_key
      "admin_logged_token"
    end

    def jwt_secret
      Rails.application.secrets.jwt[:secret_key]
    end

    def algorithm
      Rails.application.secrets.jwt[:algorithm]
    end

    def create_token(payload)
      JWT.encode(payload, jwt_secret, algorithm)
    end

    def json_body
      ::JSON.parse(response.body)
    end

    def admin_auth_header
      { "HTTP_AUTHORIZATION": login_admin }
    end

    def login_customer(customer)
      uuid = customer.jti
      payload = { jti: uuid, id: customer.id, login_at: Time.zone.now.to_i }
      create_token(payload)
    end

    def customer_auth_header(customer)
      { "HTTP_AUTHORIZATION": login_customer(customer) }
    end
  end
end
