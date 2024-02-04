import React, { useContext } from "react";
import { AuthContext } from "../../hooks/useAuth";
import { USER_TYPES } from "../../constants";
import { createGroceriesOrder } from "../../api/groceriesOrders";

const Grocery = ({ grocery, handleEdit, onAddToCart }) => {
  const context = useContext(AuthContext);
  const isAdmin = context.loggedInUserType === USER_TYPES.admin;
  const isCustomer = context.loggedInUserType === USER_TYPES.customer;

  const handleAddToCart = () => {
    const data = { groceries_order: { grocery_id: grocery.id, quantity: 1 } }
    createGroceriesOrder(data).then(() => onAddToCart()).catch(() => 0);
  }

  return (
    <div>
      <div>{grocery.name}</div>
      <div>
        Price: Rs. {grocery.price_per_unit} per {grocery.unit || "unit"}
      </div>
      {grocery.is_out_of_stock ? <div>Out of stock</div> : null}
      {isAdmin ? <button onClick={handleEdit}>Edit</button> : null}
      {isCustomer ? <button onClick={handleAddToCart}>Add to cart</button> : null}
    </div>
  );
};

export default Grocery;
