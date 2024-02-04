FactoryBot.define do
  factory :groceries_order do
    association :order
    association :grocery
    quantity { 1 }
  end
end
