import React, { useCallback, useEffect, useMemo, useState } from "react";
import GroceryOrderItem from "./GroceryOrderItem";
import {
  fetchCustomerOrder,
  updateCustomerOrder,
} from "../../api/customerOrders";
import Address from "../Addresses/Address";
import { useParams } from "react-router-dom";
import Select from "../Utils/Select";

const OrdersShow = ({ orderProps }) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(orderProps);
  const [statuses, setStatuses] = useState([]);

  const statusOptions = useMemo(() => {
    let formattedStatuses = statuses.map((status) => ({
      id: status,
      value: status
    }));

    return formattedStatuses;
  }, [statuses, order]);

  useEffect(() => {
    if (orderProps) {
      setOrder(orderProps);
    }

    if (orderId) {
      fetchOrder();
    }
  }, [orderProps, orderId]);

  const fetchOrder = useCallback(() => {
    if (!order && !orderId) {
      return;
    }

    fetchCustomerOrder(order ? order.id : orderId)
      .then((response) => {
        setOrder(response.order);
        setStatuses(response.statuses);
      })
      .catch(() => 0);
  }, [order]);

  const updateOrder = (data) => {
    updateCustomerOrder(order.id, { order: data })
      .then(fetchOrder)
      .catch(() => 0);
  };

  const handleStatusUpdate = (event) => {
    const status = event.target.value;
    updateOrder({ status });
  };

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
              isEditable={order.status === "in_cart"}
            />
          ))
        : "Loading"}

      {order.address ? <Address address={order.address} /> : null}
      <Select defaultValue={order.status} options={statusOptions} onChange={handleStatusUpdate} />
      <div>Total price: {calculateTotalOrderPrice()}</div>
    </div>
  );
};

export default OrdersShow;
