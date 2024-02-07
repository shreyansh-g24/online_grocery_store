import React, { useEffect, useState } from "react";
import { fetchCustomerOrders } from "../../api/customerOrders";
import OrdersShow from "./show";
import OrderRow from "./OrderRow";

const OrdersIndex = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchCustomerOrders()
      .then((response) => setOrders(response.orders))
      .catch(() => 0);
  }, []);

  return (
    <div className="p-2">
      {orders.map((order, index) => (
        <OrderRow key={order.id} index={index} order={order} />
      ))}
    </div>
  );
};

export default OrdersIndex;
