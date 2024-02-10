require "test_helper"

class Api::V1::Admin::OrdersControllerTest < ActionDispatch::IntegrationTest
  test "#index - gets unauthorized if the admin is not logged in" do
    get api_v1_admin_orders_path
    assert_response :unauthorized
    assert_includes json_body["errors"], "Please sign in before continuing"
  end

  test "#index - success if admin is logged in with valid params" do
    order = create(:order, status: Order.statuses[:placed])
    get api_v1_admin_orders_path, xhr: true, headers: admin_auth_header
    assert_response :ok
    assert_equal 1, json_body["orders"].count
  end

  test "#show - gets unauthorized if the admin is not logged in" do
    order = create(:order)
    get api_v1_admin_order_path(order.id)
    assert_response :unauthorized
    assert_includes json_body["errors"], "Please sign in before continuing"
  end

  test "#show - success if admin is logged in with valid params" do
    order = create(:order)

    get api_v1_admin_order_path(order.id), xhr: true, headers: admin_auth_header
    assert_response :ok
  end

  test "#update - gets unauthorized if the admin is not logged in" do
    order = create(:order)
    put api_v1_admin_order_path(order.id)
    assert_response :unauthorized
    assert_includes json_body["errors"], "Please sign in before continuing"
  end

  test "#update - success if admin is logged in with valid params" do
    order = create(:order)

    put api_v1_admin_order_path(order.id), xhr: true, headers: admin_auth_header, params: { order: { status: Order.statuses[:delivered] } }
    assert_response :ok
    assert_equal Order.statuses[:delivered], order.reload.status
  end
end
