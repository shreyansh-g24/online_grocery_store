class Grocery < ApplicationRecord
  has_many :groceries_orders
  has_many :orders, through: :groceries_orders

  validates_presence_of :name
  validates :price_per_unit, numericality: { greater_than: 0 }

  before_save :remove_groceries_orders, if: :is_out_of_stock?

  private

  def remove_groceries_orders
    groceries_orders.joins(:order).where({ order: { status: "in_cart" } }).destroy_all
  end
end
