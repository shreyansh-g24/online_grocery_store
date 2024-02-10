require "test_helper"

class GroceriesOrderTest < ActiveSupport::TestCase
  test "valid groceries order" do
    groceries_order = GroceriesOrder.new(order: Order.new, grocery: Grocery.new, quantity: 1)
    assert groceries_order.valid?
  end

  test "order must exist" do
    groceries_order = GroceriesOrder.new(order: nil, grocery: Grocery.new)
    assert_not groceries_order.valid?
    assert_includes groceries_order.errors.full_messages, "Order must exist"
  end

  test "grocery must exist" do
    groceries_order = GroceriesOrder.new(order: Order.new, grocery: nil)
    assert_not groceries_order.valid?
    assert_includes groceries_order.errors.full_messages, "Grocery must exist"
  end

  test "grocery must be unique in an order" do
    groceries_order1 = create(:groceries_order)
    groceries_order2 = build(:groceries_order, order_id: groceries_order1.order_id, grocery_id: groceries_order1.grocery_id)
    assert_not groceries_order2.valid?
    assert_includes groceries_order2.errors.full_messages, "Grocery has already been taken"
  end
end
