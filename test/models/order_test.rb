require "test_helper"

class OrderTest < ActiveSupport::TestCase
  test "valid order" do
    order = build(:order)
    assert order.valid?
  end

  test "address is optional" do
    order = build(:order, address: nil)
    assert order.valid?
  end

  test "customer must exist" do
    order = build(:order, customer: nil)
    assert_not order.valid?
    assert_includes order.errors.full_messages, "Customer must exist"
  end

  test "status can't be blank" do
    order = build(:order, status: nil)
    assert_not order.valid?
    assert_includes order.errors.full_messages, "Status can't be blank"
  end
end
