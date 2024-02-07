class Grocery < ApplicationRecord
  has_many :groceries_orders
  has_many :orders, through: :groceries_orders

  validates_presence_of :name
  validates :price_per_unit, numericality: { greater_than: 0 }
end
