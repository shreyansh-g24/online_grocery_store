import React from "react";
import { destroyGroceriesOrder, updateGroceriesOrder } from "../../api/groceriesOrders";

const GroceryOrderItem = ({ grocery_order, onUpdateCallback }) => {
  const updateQuantity = (quantity) => {
    updateGroceriesOrder(grocery_order.id, { groceries_order: { quantity } })
      .then((response) => onUpdateCallback())
      .catch(() => 0);
  };

  const decrementQuantity = () => {
    updateQuantity(grocery_order.quantity - 1);
  };

  const incrementQuantity = () => {
    updateQuantity(grocery_order.quantity + 1);
  };

  const handleItemRemove = () => {
    destroyGroceriesOrder(grocery_order.id)
      .then(response => onUpdateCallback())
      .catch(() => 0)
  }

  return (
    <div>
      <div>{grocery_order.grocery.name}</div>
      <div>
        {grocery_order.grocery.is_out_of_stock ? "Out of stock" : "Available"}
      </div>
      <div>
        Price: Rs.{" "}
        {grocery_order.grocery.price_per_unit * grocery_order.quantity}
      </div>
      <div>
        <button onClick={decrementQuantity}>-</button>
        <div>{grocery_order.quantity}</div>
        <button onClick={incrementQuantity}>+</button>
      </div>

      <button onClick={handleItemRemove}>
        Remove from cart
      </button>
    </div>
  );
};

export default GroceryOrderItem;
