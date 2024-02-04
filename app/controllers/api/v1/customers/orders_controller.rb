class Api::V1::Customers::OrdersController < Api::V1::Customers::BaseController
  def index
    orders = current_customer.orders
    respond_with_json({ orders: orders }, :ok)
  end

  def create
    order = current_customer.orders.find_or_create_by(status: Order.statuses[:in_cart])
    respond_with_json({ order: order, statuses: Order::CUSTOMERS_STATUSES, addresses: current_customer.addresses }, :ok)
  end

  def show
    order = current_customer.orders.find_by(id: params[:id])
    if order.present?
      respond_with_json({ order: order, statuses: Order::CUSTOMERS_STATUSES, addresses: current_customer.addresses }, :ok)
    else
      respond_with_json({ errors: ["Order not found"] }, :not_found)
    end
  end

  def update
    order = current_customer.orders.find_by(id: params[:id])
    if order.update(order_params)
      respond_with_json({ message: "Order updated successfully", order: order }, :ok)
    else
      respond_with_json({ errors: order.errors.full_messages }, :unprocessable_entity)
    end
  end

  private

  def order_params
    params.require(:order).permit(:address_id, :status)
  end
end
