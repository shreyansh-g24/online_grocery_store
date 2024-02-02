class Api::V1::Admin::OrdersController < Api::V1::Admin::BaseController
  def index
    respond_with_json([], :ok)
  end
end
