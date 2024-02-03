class Api::V1::GroceriesController < Api::V1::BaseController
  def index
    respond_with_json({ groceries: Grocery.all }, :ok)
  end
end
