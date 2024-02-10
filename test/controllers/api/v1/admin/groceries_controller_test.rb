require "test_helper"

class Api::V1::Admin::GroceriesControllerTest < ActionDispatch::IntegrationTest
  test "#create - gets unauthorized if the admin is not logged in" do
    post api_v1_admin_groceries_path
    assert_response :unauthorized
    assert_includes json_body["errors"], "Please sign in before continuing"
  end

  test "#create - success if admin is logged in with valid params" do
    assert_difference "Grocery.count", 1 do
      post api_v1_admin_groceries_path, xhr: true, headers: admin_auth_header, params: { grocery: { name: "Grocery 1", price_per_unit: 1 } }
      assert_response :ok
    end
  end

  test "#update - gets unauthorized if the admin is not logged in" do
    grocery = create(:grocery)
    put api_v1_admin_grocery_path(grocery.id)
    assert_response :unauthorized
    assert_includes json_body["errors"], "Please sign in before continuing"
  end

  test "#update - success if admin is logged in with valid params" do
    grocery = create(:grocery)
    assert_no_difference "Grocery.count" do
      put api_v1_admin_grocery_path(grocery.id), xhr: true, headers: admin_auth_header, params: { grocery: { name: "Grocery updated" } }
      assert_response :ok
      assert_equal "Grocery updated", grocery.reload.name
    end
  end
end
