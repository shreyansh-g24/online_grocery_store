class GroceriesOrder < ApplicationRecord
  belongs_to :order
  belongs_to :grocery
end
