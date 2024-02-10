require "test_helper"

class Api::V1::Customers::AddressesControllerTest < ActionDispatch::IntegrationTest
  test "#index - get unauthorized if customer is not logged in" do
    get api_v1_customers_addresses_path
    assert_response :unauthorized
    assert_includes json_body["errors"], "Auth token not found"
  end

  test "#index - get success if the customer is logged in" do
    customer = create(:customer)
    address = create(:address, customer: customer)
    get api_v1_customers_addresses_path, headers: customer_auth_header(customer)
    assert_response :ok
    assert_includes json_body["addresses"].map { |ad| ad["id"] }, address.id
  end

  test "#create - get unauthorized if customer is not logged in" do
    post api_v1_customers_addresses_path
    assert_response :unauthorized
    assert_includes json_body["errors"], "Auth token not found"
  end

  test "#create - get success if customer is logged in with valid params" do
    customer = create(:customer)
    assert_difference "Address.count", 1 do
      post api_v1_customers_addresses_path, xhr: true, headers: customer_auth_header(customer), params: { address: { label: "Address 1", full_address: "ABC", contact: "1234" } }
      assert_response :ok
    end
  end

  test "#update - get unauthorized if customer is not logged in" do
    put api_v1_customers_address_path(1)
    assert_response :unauthorized
    assert_includes json_body["errors"], "Auth token not found"
  end

  test "#update - get success if customer is logged in with valid params" do
    customer = create(:customer)
    address = create(:address, customer: customer)
    assert_no_difference "Address.count" do
      put api_v1_customers_address_path(address.id), xhr: true, headers: customer_auth_header(customer), params: { address: { label: "Address updated" } }
      assert_response :ok
      assert_equal "Address updated", address.reload.label
    end
  end
end
