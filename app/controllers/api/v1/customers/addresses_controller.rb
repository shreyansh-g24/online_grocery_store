class Api::V1::Customers::AddressesController < Api::V1::Customers::BaseController
  def index
    respond_with_json({ addresses: [] }, :ok)
  end
end
