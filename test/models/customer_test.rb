require "test_helper"

class CustomerTest < ActiveSupport::TestCase
  test "valid customer" do
    customer = Customer.new(email: "sam@example.com", encrypted_password: "welcome", password: "123456", jti: "token")
    assert customer.valid?
  end

  test "email can't be blank" do
    customer = Customer.new(email: nil, encrypted_password: "welcome")
    assert_not customer.valid?
    assert_includes customer.errors.full_messages, "Email can't be blank"
  end

  test "encrypted_password can't be blank" do
    customer = Customer.new(email: "sam@example.com", encrypted_password: nil)
    assert_not customer.valid?
    assert_includes customer.errors.full_messages, "Encrypted password can't be blank"
  end

  test "jti can't be blank" do
    customer = Customer.new(email: "sam@example.com", encrypted_password: "welcome", password: "123456")
    assert customer.save!
    assert_raises ActiveRecord::NotNullViolation do
      customer.update_column :jti, nil
    end
  end

  test "before create assigns a unique jti to customer" do
    customer = Customer.new(email: "sam@example.com", encrypted_password: "welcome", password: 123456)
    assert_nil customer.jti
    assert customer.save!
    assert_not_nil customer.jti
  end

  test "email must be unique" do
    customer = Customer.new(email: "sam@example.com", encrypted_password: "welcome", password: 123456)
    customer.save!

    customer2 = Customer.new(email: "sam@example.com")
    assert_not customer2.valid?
    assert_includes customer2.errors.full_messages, "Email has already been taken"
  end
end
