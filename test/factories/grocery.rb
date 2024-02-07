FactoryBot.define do
  factory :grocery do
    sequence(:name) { |n| "Grocery#{n}" }
    price_per_unit { Random.rand(1000) }
  end
end
