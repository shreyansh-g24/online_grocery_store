class Address < ApplicationRecord
  belongs_to :customer

  validates_presence_of :full_address, :contact
end
