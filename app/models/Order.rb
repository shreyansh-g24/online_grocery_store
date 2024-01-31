class Order < ApplicationRecord
  belongs_to :address
  has_many :groceries_orders
  has_many :groceries, through: :groceries_orders

  enum status: [:in_card, :placed, :delivered, :canceled, :rejected]
end