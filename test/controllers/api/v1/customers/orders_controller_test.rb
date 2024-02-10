require "test_helper"

class Api::V1::Customers::OrdersControllerTest < ActionDispatch::IntegrationTest
  test "#index - get unauthorized if customer is not logged in" do
    get api_v1_customers_orders_path
    assert_response :unauthorized
    assert_includes json_body["errors"], "Auth token not found"
  end

  test "#index - get success if the customer is logged in" do
    customer = create(:customer)
    order = create(:order, customer: customer)
    get api_v1_customers_orders_path, headers: customer_auth_header(customer)
    assert_response :ok
    assert_includes json_body["orders"].map { |ad| ad["id"] }, order.id
  end

  test "#create - get unauthorized if customer is not logged in" do
    post api_v1_customers_orders_path
    assert_response :unauthorized
    assert_includes json_body["errors"], "Auth token not found"
  end

  test "#create - get success if customer is logged in with valid params" do
    customer = create(:customer)
    assert_difference "Order.count", 1 do
      post api_v1_customers_orders_path, xhr: true, headers: customer_auth_header(customer)
      assert_response :ok
    end
  end

  test "#show - get unauthorized if customer is not logged in" do
    get api_v1_customers_order_path(1)
    assert_response :unauthorized
    assert_includes json_body["errors"], "Auth token not found"
  end

  test "#show - get success if customer is logged in with valid params" do
    customer = create(:customer)
    order = create(:order, customer: customer)

    get api_v1_customers_order_path(order.id), xhr: true, headers: customer_auth_header(customer)
    assert_response :ok
  end

  test "#update - get unauthorized if customer is not logged in" do
    put api_v1_customers_order_path(1)
    assert_response :unauthorized
    assert_includes json_body["errors"], "Auth token not found"
  end

  test "#update - get success if customer is logged in with valid params" do
    customer = create(:customer)
    order = create(:order, customer: customer)
    assert_no_difference "Order.count" do
      put api_v1_customers_order_path(order.id), xhr: true, headers: customer_auth_header(customer), params: { order: { status: Order.statuses[:placed] } }
      assert_response :ok
      assert_equal Order.statuses[:placed], order.reload.status
    end
  end
end
