class GroceriesOrder < ApplicationRecord
  belongs_to :order
  belongs_to :grocery

  validates_uniqueness_of :grocery, scope: :order
  validates :quantity, numericality: { greater_than: 0 }
end
