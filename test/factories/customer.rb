FactoryBot.define do
  factory :customer do
    name { 'Oliver Smith' }
    sequence(:email) { |n| "oliver#{n}@example.com" }
    password { "123456" }
    password_confirmation { "123456" }
  end
end
