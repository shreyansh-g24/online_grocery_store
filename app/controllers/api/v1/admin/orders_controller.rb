class Api::V1::Admin::OrdersController < Api::V1::Admin::BaseController
  def index
    respond_with_json({ orders: Order.not_in_cart }, :ok)
  end

  def show
    order = Order.find_by(id: params[:id])
    if order.present?
      respond_with_json({ order: order, statuses: ([order.status] + Order::ADMIN_STATUSES).uniq }, :ok)
    else
      respond_with_json({ errors: ["Order not found"] }, :not_found)
    end
  end

  def update
    order = Order.find_by(id: params[:id])
    if order.present? && order.update(order_params)
      respond_with_json({ message: "Order updated successfully" }, :ok)
    elsif order.present?
      respond_with_json({ errors: order.errors.full_messages }, :unprocessable_entity)
    else
      respond_with_json({ errors: ["Order not found"] }, :not_found)
    end
  end

  def order_params
    params.require(:order).permit(:status)
  end
end
