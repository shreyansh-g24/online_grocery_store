class Api::V1::GroceriesController < Api::V1::BaseController
  def index
    respond_with_json({ current_customer: current_customer.as_json }, :ok)
  end
end
