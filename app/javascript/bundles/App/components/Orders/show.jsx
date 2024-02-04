import React, { useCallback, useEffect, useMemo, useState } from "react";
import GroceryOrderItem from "./GroceryOrderItem";
import {
  fetchCustomerOrder,
  updateCustomerOrder,
} from "../../api/customerOrders";
import Address from "../Addresses/Address";
import { useParams } from "react-router-dom";
import Select from "../Utils/Select";

const OrdersShow = ({ orderProps, statusesProps, addressesProps }) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(orderProps);
  const [statuses, setStatuses] = useState(statusesProps || []);
  const [addresses, setAddresses] = useState(addressesProps || []);

  const statusOptions = useMemo(() => {
    let formattedStatuses = statuses.map((status) => ({
      id: status,
      value: status,
      options: { disabled: status === "in_cart" }
    }));

    return formattedStatuses;
  }, [statuses]);

  const addressOptions = useMemo(() => {
    return [{ id: "", value: "Select", options: { disabled: true } }].concat(
      addresses.map((add) => ({ id: add.id, value: add.label }))
    );
  }, [addresses]);

  useEffect(() => {
    if (orderProps) {
      setOrder(orderProps);
    }
  }, [orderProps]);

  useEffect(() => {
    if (statusesProps) setStatuses(statusesProps);
  }, [statusesProps]);
  useEffect(() => {
    if (addressesProps) setAddresses(addressesProps);
  }, [addressesProps]);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = useCallback(() => {
    if (!order && !orderId) {
      return;
    }

    fetchCustomerOrder(order ? order.id : orderId)
      .then((response) => {
        setOrder(response.order);
        setStatuses(response.statuses);
        setAddresses(response.addresses);
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

  const handleAddressUpdate = (event) => {
    const addressId = event.target.value;
    updateOrder({ address_id: addressId });
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

      <Select
        defaultValue={order.address_id || ""}
        options={addressOptions}
        onChange={handleAddressUpdate}
      />
      {order.address ? <Address address={order.address} /> : null}
      <Select
        defaultValue={order.status}
        options={statusOptions}
        onChange={handleStatusUpdate}
      />
      <div>Total price: {calculateTotalOrderPrice()}</div>
    </div>
  );
};

export default OrdersShow;
