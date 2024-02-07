class Order < ApplicationRecord
  CUSTOMERS_STATUSES = %w[in_cart placed canceled]
  ADMIN_STATUSES = %w[delivered rejected]

  belongs_to :address, optional: true
  belongs_to :customer
  has_many :groceries_orders
  has_many :groceries, through: :groceries_orders

  validates_presence_of :status
  validates_presence_of :address, unless: :in_cart?

  enum status: { in_cart: "in_cart", placed: "placed", delivered: "delivered", canceled: "canceled", rejected: "rejected" }

  def as_json(_options)
    super({
      include: [:address, { groceries_orders: { include: :grocery } }]
    })
  end

  def customer_statuses
    if status.in?(ADMIN_STATUSES)
      [status]
    else
      CUSTOMERS_STATUSES
    end
  end
end