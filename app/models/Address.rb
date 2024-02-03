class Address < ApplicationRecord
  belongs_to :customer

  validates_presence_of :label, :full_address, :contact
end
