class Customer < ApplicationRecord
  validates_presence_of :email
  validates_uniqueness_of :email
end
