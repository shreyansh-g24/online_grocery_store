class Api::V1::GroceriesController < Api::V1::BaseController
  def index
    respond_with_json({ groceries: [] }, :ok)
  end
end
