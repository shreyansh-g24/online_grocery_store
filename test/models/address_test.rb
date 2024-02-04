require "test_helper"

class AddressTest < ActiveSupport::TestCase
  test "valid address" do
    address = Address.new(customer: Customer.new, label: "label", full_address: "Address", contact: "9876543210")
    assert address.valid?
  end

  test "customer must exist" do
    address = Address.new(customer: nil, label: "label", full_address: "Address", contact: "9876543210")
    assert_not address.valid?
    assert_includes address.errors.full_messages, "Customer must exist"
  end

  test "label can't be blank" do
    address = Address.new(customer: Customer.new, label: nil, full_address: "Address", contact: "9876543210")
    assert_not address.valid?
    assert_includes address.errors.full_messages, "Label can't be blank"
  end

  test "full_address can't be blank" do
    address = Address.new(customer: Customer.new, label: "Label", full_address: nil, contact: "9876543210")
    assert_not address.valid?
    assert_includes address.errors.full_messages, "Full address can't be blank"
  end

  test "contact can't be blank" do
    address = Address.new(customer: Customer.new, label: "label", full_address: "Address", contact: nil)
    assert_not address.valid?
    assert_includes address.errors.full_messages, "Contact can't be blank"
  end
end
