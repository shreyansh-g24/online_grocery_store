import React, { useEffect, useState } from "react";
import { createCustomerOrder } from "../../api/customerOrders";
import { toast } from "react-toastify";
import OrdersShow from "../Orders/show";

const GroceriesCart = ({ order }) => {
  return (
    <div>
      <OrdersShow orderProps={order} />
    </div>
  );
};

export default GroceriesCart;
