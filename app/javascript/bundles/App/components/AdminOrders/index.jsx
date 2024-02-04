import React, { useEffect, useState } from "react";

import { fetchOrders } from "../../api/adminOrders";
import OrderRow from "../Orders/OrderRow";

const AdminOrdersIndex = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders()
      .then((response) => setOrders(response.orders))
      .catch(() => 0);
  }, []);

  return (
    <div>
      Orders
      {orders.map((order, index) => (
        <OrderRow key={order.id} index={index} order={order} />
      ))}
    </div>
  );
};

export default AdminOrdersIndex;
