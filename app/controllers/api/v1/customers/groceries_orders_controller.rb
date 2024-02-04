class Api::V1::Customers::GroceriesOrdersController < Api::V1::Customers::BaseController
  before_action :load_order

  def create
    groceries_order = @order.groceries_orders.new(groceries_order_create_params)
    if groceries_order.save
      respond_with_json({ message: "Successfully added grocery to cart", groceries_order: groceries_order }, :ok)
    else
      respond_with_json({ errors: groceries_order.errors.full_messages }, :unprocessable_entity)
    end
  end

  def update
    # handle quantity less than zero
    groceries_order = @order.groceries_orders.find_by(id: params[:id])
    if groceries_order.update(groceries_order_update_params)
      respond_with_json({ message: "Successfully updated grocery quantity", groceries_order: groceries_order }, :ok)
    else
      respond_with_json({ errors: groceries_order.errors.full_messages }, :unprocessable_entity)
    end
  end

  def destroy
    groceries_order = @order.groceries_orders.find_by(id: params[:id])
    if groceries_order&.destroy
      respond_with_json({ message: "Successfully removed grocery from cart" }, :ok)
    else
      respond_with_json({ errors: groceries_order.present? ? groceries_order.errors.full_messages : ["Grocery not found in the cart"] }, :unprocessable_entity)
    end
  end

  private

  def groceries_order_create_params
    params.require(:groceries_order).permit(:grocery_id, :quantity)
  end

  def groceries_order_update_params
    params.require(:groceries_order).permit(:quantity)
  end

  def load_order
    @order = current_customer.orders.in_cart.first

    unless @order.present?
      respond_with_json({ errors: ["Cart not found"] }, :not_found)
    end
  end
end
