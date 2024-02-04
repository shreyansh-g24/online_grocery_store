import React, { useCallback, useEffect, useState } from "react";
import GroceryOrderItem from "./GroceryOrderItem";
import { fetchCustomerOrder } from "../../api/customerOrders";
import Address from "../Addresses/Address";
import { useParams } from "react-router-dom";

const OrdersShow = ({ orderProps }) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(orderProps);

  useEffect(() => {
    if (orderProps) {
      setOrder(orderProps);
    }

    if (orderId) {
      fetchOrder()
    }
  }, [orderProps, orderId]);

  const fetchOrder = useCallback(() => {
    if (!order && !orderId) {
      return;
    }

    fetchCustomerOrder(order ? order.id : orderId)
      .then((response) => setOrder(response.order))
      .catch(() => 0);
  }, [order]);

  const calculateTotalOrderPrice = () => {
    if (!order || !order.groceries_orders) {
      return 0;
    }

    return order.groceries_orders.reduce((acc, groceryOrder) => {
      return acc + groceryOrder.quantity * groceryOrder.grocery.price_per_unit;
    }, 0);
  };

  if (!order) {
    return "Loading";
  }

  return (
    <div>
      {order.groceries_orders
        ? order.groceries_orders.map((groceryOrder) => (
            <GroceryOrderItem
              key={groceryOrder.id}
              groceryOrder={groceryOrder}
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
