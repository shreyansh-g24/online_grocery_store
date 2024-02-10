require "test_helper"

class Api::V1::Customers::GroceriesOrdersControllerTest < ActionDispatch::IntegrationTest
  test "#create - get unauthorized if customer is not logged in" do
    post api_v1_customers_groceries_orders_path
    assert_response :unauthorized
    assert_includes json_body["errors"], "Auth token not found"
  end

  test "#create - get success if customer is logged in with valid params" do
    customer = create(:customer)
    create(:order, customer: customer, status: Order.statuses[:in_cart])
    grocery = create(:grocery)
    assert_difference "GroceriesOrder.count", 1 do
      post api_v1_customers_groceries_orders_path, xhr: true, headers: customer_auth_header(customer), params: { groceries_order: { grocery_id: grocery.id, quantity: 1 } }
      assert_response :ok
    end
  end

  test "#update - get unauthorized if customer is not logged in" do
    put api_v1_customers_groceries_order_path(1)
    assert_response :unauthorized
    assert_includes json_body["errors"], "Auth token not found"
  end

  test "#update - get success if customer is logged in with valid params" do
    customer = create(:customer)
    order = create(:order, customer: customer, status: Order.statuses[:in_cart])
    grocery_order = create(:groceries_order, order: order)
    assert_no_difference "GroceriesOrder.count" do
      put api_v1_customers_groceries_order_path(grocery_order.id), xhr: true, headers: customer_auth_header(customer), params: { groceries_order: { quantity: 2 } }
      assert_response :ok
    end
  end

  test "#destroy - get unauthorized if customer is not logged in" do
    delete api_v1_customers_groceries_order_path(1)
    assert_response :unauthorized
    assert_includes json_body["errors"], "Auth token not found"
  end

  test "#destroy - get success if customer is logged in with valid params" do
    customer = create(:customer)
    order = create(:order, customer: customer, status: Order.statuses[:in_cart])
    grocery_order = create(:groceries_order, order: order)
    assert_difference "GroceriesOrder.count", -1 do
      delete api_v1_customers_groceries_order_path(grocery_order.id), xhr: true, headers: customer_auth_header(customer)
      assert_response :ok
    end
  end
end
