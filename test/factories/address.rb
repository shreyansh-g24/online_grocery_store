FactoryBot.define do
  factory :address do
    association :customer
    label { "Home" }
    full_address { "ABC street" }
    contact { "9876543210" }
  end
end
