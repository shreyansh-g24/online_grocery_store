FactoryBot.define do
  factory :grocery do
    sequence(:name) { |n| "Grocery#{n}" }
  end
end
