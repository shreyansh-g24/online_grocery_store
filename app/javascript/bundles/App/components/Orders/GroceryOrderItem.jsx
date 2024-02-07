import React from "react";
import {
  destroyGroceriesOrder,
  updateGroceriesOrder,
} from "../../api/groceriesOrders";

const GroceryOrderItem = ({ groceryOrder, onUpdateCallback, isEditable }) => {
  const updateQuantity = (quantity) => {
    updateGroceriesOrder(groceryOrder.id, { groceries_order: { quantity } })
      .then((response) => onUpdateCallback())
      .catch(() => 0);
  };

  const decrementQuantity = () => {
    updateQuantity(groceryOrder.quantity - 1);
  };

  const incrementQuantity = () => {
    updateQuantity(groceryOrder.quantity + 1);
  };

  const handleItemRemove = () => {
    destroyGroceriesOrder(groceryOrder.id)
      .then((response) => onUpdateCallback())
      .catch(() => 0);
  };

  const totalGroceryCost = () => {
    return groceryOrder.quantity * groceryOrder.grocery.price_per_unit;
  };

  const groceryPerUnitPriceLabel = () => {
    return `Rs. ${groceryOrder.grocery.price_per_unit} / ${groceryOrder.grocery.unit}`;
  };

  const getGroceryQuantity = () => {
    const quantity = groceryOrder.quantity;
    const unit = `${groceryOrder.grocery.unit}${quantity === 1 ? "" : "s"}`;
    return `${quantity} ${unit}`;
  };

  return (
    <div>
      <div className="font-bold">{groceryOrder.grocery.name}</div>
      <div className="text-red-500 capitalize">
        {groceryOrder.grocery.is_out_of_stock ? "Out of stock" : ""}
      </div>
      <div className="flex flex-col items-center justify-center">
        <div>
          Cost: Rs. {totalGroceryCost()}{" "}
          <span className="italic">@ {groceryPerUnitPriceLabel()}</span>
        </div>
        <div className="flex items-center justify-start mb-2">
          <div className="mr-2">Quantity:</div>
          {isEditable ? (
            <button className="btn-circle mr-2" onClick={decrementQuantity}>
              -
            </button>
          ) : null}
          <div className="mr-2">{getGroceryQuantity()}</div>
          {isEditable ? (
            <button className="btn-circle" onClick={incrementQuantity}>
              +
            </button>
          ) : null}
        </div>

        {isEditable ? (
          <button className="btn-danger" onClick={handleItemRemove}>
            Remove from cart
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default GroceryOrderItem;
