import React, { useCallback, useEffect, useState } from "react";
import GroceryOrderItem from "./GroceryOrderItem";
import { fetchCustomerOrder } from "../../api/customerOrders";
import { toast } from "react-toastify";

const OrdersShow = ({ orderProps }) => {
  const [order, setOrder] = useState(orderProps);

  useEffect(() => {
    setOrder(orderProps);
  }, [orderProps]);

  const fetchOrder = useCallback(() => {
    fetchCustomerOrder(orderProps.id)
      .then((response) => setOrder(response.order))
      .catch(() =>
        toast.error("Something went wrong. Please contact support.")
      );
  }, []);

  return (
    <div>
      {order && order.groceries_orders
        ? order.groceries_orders.map((grocery_order) => (
            <GroceryOrderItem
              key={grocery_order.id}
              grocery_order={grocery_order}
              onUpdateCallback={fetchOrder}
            />
          ))
        : "Loading"}
    </div>
  );
};

export default OrdersShow;
