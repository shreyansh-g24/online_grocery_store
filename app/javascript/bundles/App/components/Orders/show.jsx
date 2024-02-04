import React, { useCallback, useEffect, useState } from "react";
import GroceryOrderItem from "./GroceryOrderItem";
import { fetchCustomerOrder } from "../../api/customerOrders";
import Address from "../Addresses/Address";

const OrdersShow = ({ orderProps }) => {
  const [order, setOrder] = useState(orderProps);

  useEffect(() => {
    setOrder(orderProps);
  }, [orderProps]);

  const fetchOrder = useCallback(() => {
    if (!order) {
      return;
    }

    fetchCustomerOrder(order.id)
      .then((response) => setOrder(response.order))
      .catch(() => 0);
  }, [order]);

  const calculateTotalOrderPrice = () => {
    if (!order || !order.groceries_orders) {
      return 0;
    }

    return order.groceries_orders.reduce((acc, grocery_order) => {
      return (
        acc + grocery_order.quantity * grocery_order.grocery.price_per_unit
      );
    }, 0);
  };

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

      {order.address ? <Address address={order.address} /> : null}
      <div>{order.status}</div>
      <div>Total price: {calculateTotalOrderPrice()}</div>
    </div>
  );
};

export default OrdersShow;
