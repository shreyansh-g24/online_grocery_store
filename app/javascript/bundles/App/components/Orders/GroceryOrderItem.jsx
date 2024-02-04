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

  return (
    <div>
      <div>{groceryOrder.grocery.name}</div>
      <div>
        {groceryOrder.grocery.is_out_of_stock ? "Out of stock" : "Available"}
      </div>
      <div>
        Price: Rs. {groceryOrder.grocery.price_per_unit * groceryOrder.quantity}
      </div>
      <div>
        {isEditable ? <button onClick={decrementQuantity}>-</button> : null}
        <div>
          {groceryOrder.quantity} {groceryOrder.grocery.unit}
        </div>
        {isEditable ? <button onClick={incrementQuantity}>+</button> : null}
      </div>

      {isEditable ? (
        <button onClick={handleItemRemove}>Remove from cart</button>
      ) : null}
    </div>
  );
};

export default GroceryOrderItem;
