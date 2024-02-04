FactoryBot.define do
  factory :order do
    association :address
    association :customer
    status { Order.statuses[:in_cart] }
  end
end
