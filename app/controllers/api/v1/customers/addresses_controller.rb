class Api::V1::Customers::AddressesController < Api::V1::Customers::BaseController
  def index
    respond_with_json({ addresses: current_customer.addresses }, :ok)
  end

  def create
    address = current_customer.addresses.new(address_params)
    if address.valid? && address.save
      respond_with_json({ message: "Address created successfully", address: address }, :ok)
    else
      respond_with_json({ errors: address.errors.full_messages }, :unprocessable_entity)
    end
  end

  def update
    address = current_customer.addresses.find_by(id: params[:id])
    if address.present? && address.update(address_params)
      respond_with_json({ message: "Address updated successfully", address: address }, :ok)
    elsif address.present?
      respond_with_json({ errors: address.errors.full_messages }, :unprocessable_entity)
    else
      respond_with_json({ errors: ["Address not found"] }, :not_found)
    end
  end

  private

  def address_params
    params.require(:address).permit(:label, :full_address, :contact)
  end
end
