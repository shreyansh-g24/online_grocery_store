require "test_helper"

class GroceryTest < ActiveSupport::TestCase
  test "valid grocery" do
    grocery = build(:grocery)
    assert grocery.valid?
  end

  test "name can't be blank" do
    grocery = build(:grocery, name: nil)
    assert_not grocery.valid?
    assert_includes grocery.errors.full_messages, "Name can't be blank"
  end
end
