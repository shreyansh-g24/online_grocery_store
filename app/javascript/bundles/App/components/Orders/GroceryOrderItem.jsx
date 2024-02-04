import React from "react";
import { destroyGroceriesOrder, updateGroceriesOrder } from "../../api/groceriesOrders";

const GroceryOrderItem = ({ groceryOrder, onUpdateCallback }) => {
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
      .then(response => onUpdateCallback())
      .catch(() => 0)
  }

  return (
    <div>
      <div>{groceryOrder.grocery.name}</div>
      <div>
        {groceryOrder.grocery.is_out_of_stock ? "Out of stock" : "Available"}
      </div>
      <div>
        Price: Rs.{" "}
        {groceryOrder.grocery.price_per_unit * groceryOrder.quantity}
      </div>
      <div>
        <button onClick={decrementQuantity}>-</button>
        <div>{groceryOrder.quantity}</div>
        <button onClick={incrementQuantity}>+</button>
      </div>

      <button onClick={handleItemRemove}>
        Remove from cart
      </button>
    </div>
  );
};

export default GroceryOrderItem;
