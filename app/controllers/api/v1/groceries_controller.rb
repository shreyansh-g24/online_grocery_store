class Api::V1::GroceriesController < Api::V1::BaseController
  skip_before_action :authenticate_user!

  def index
    respond_with_json({ groceries: [] }, :ok)
  end
end
