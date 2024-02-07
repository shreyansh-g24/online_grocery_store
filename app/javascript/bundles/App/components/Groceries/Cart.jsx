import React, { useEffect, useState } from "react";
import { createCustomerOrder } from "../../api/customerOrders";
import { toast } from "react-toastify";
import OrdersShow from "../Orders/show";

const GroceriesCart = ({ order, statuses, addresses }) => {
  return (
    <div className="h-full shadow-lg">
      <OrdersShow orderProps={order} statusesProps={statuses} addressesProps={addresses} />
    </div>
  );
};

export default GroceriesCart;
