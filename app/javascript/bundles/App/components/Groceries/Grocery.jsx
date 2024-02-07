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

  const getCostLabel = () => {
    return `Rs. ${grocery.price_per_unit} / ${grocery.unit || "unit"}`
  }

  return (
    <div className="p-2">
      <div>{grocery.name} <span className="italic">@ {getCostLabel()}</span></div>
      {grocery.is_out_of_stock ? <div className="text-red-500 capitalize">Out of stock</div> : null}
      {isCustomer && !grocery.is_out_of_stock ? <button className="btn-primary" onClick={handleAddToCart}>Add to cart</button> : null}
      {isAdmin ? <button className="btn-primary" onClick={handleEdit}>Edit</button> : null}
    </div>
  );
};

export default Grocery;
