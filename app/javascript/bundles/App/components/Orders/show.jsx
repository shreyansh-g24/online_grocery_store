import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import GroceryOrderItem from "./GroceryOrderItem";
import {
  fetchCustomerOrder,
  updateCustomerOrder,
} from "../../api/customerOrders";
import Address from "../Addresses/Address";
import { useParams } from "react-router-dom";
import Select from "../Utils/Select";
import { AuthContext } from "../../hooks/useAuth";
import { USER_TYPES } from "../../constants";
import { fetchAdminOrder, updateAdminOrder } from "../../api/adminOrders";

const OrdersShow = ({ orderProps, statusesProps, addressesProps }) => {
  const context = useContext(AuthContext);

  const { orderId } = useParams();
  const [order, setOrder] = useState(orderProps);
  const [statuses, setStatuses] = useState(statusesProps || []);
  const [addresses, setAddresses] = useState(addressesProps || []);

  const statusOptions = useMemo(() => {
    let formattedStatuses = statuses.map((status) => ({
      id: status,
      value: status,
      options: { disabled: status === "in_cart" },
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

    const fetchFn =
      context.loggedInUserType === USER_TYPES.admin
        ? fetchAdminOrder
        : fetchCustomerOrder;

    fetchFn(order ? order.id : orderId)
      .then((response) => {
        setOrder(response.order);
        setStatuses(response.statuses);
        setAddresses(response.addresses || []);
      })
      .catch(() => 0);
  }, [order]);

  const updateOrder = (data) => {
    const updateFn =
      context.loggedInUserType === USER_TYPES.admin
        ? updateAdminOrder
        : updateCustomerOrder;
    updateFn(order.id, { order: data })
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

  if (!order || !order.groceries_orders.length) {
    return <div className="p-4 bg-stone-200 w-full h-full">Cart is empty</div>;
  }

  return (
    <div className="p-4 bg-stone-200 w-full h-full flex flex-col justify-start items-center">
      {order.groceries_orders
        ? order.groceries_orders.map((groceryOrder) => (
            <div key={groceryOrder.id} className="mb-4">
              <GroceryOrderItem
                groceryOrder={groceryOrder}
                onUpdateCallback={fetchOrder}
                isEditable={
                  order.status === "in_cart" &&
                  context.loggedInUserType === USER_TYPES.customer
                }
              />
            </div>
          ))
        : "Loading"}

      <div className="font-bold mb-6 p-2 cart-total">
        Total cost: Rs. {calculateTotalOrderPrice()}
      </div>

      <div>
        Order status{" "}
        <Select
          defaultValue={order.status}
          options={statusOptions}
          onChange={handleStatusUpdate}
        />
      </div>

      <div className="my-2">
        <div className="mb-2 text-center">
          Shipping address{" "}
          {context.loggedInUserType === USER_TYPES.customer ? (
            <Select
              defaultValue={order.address_id || ""}
              options={addressOptions}
              onChange={handleAddressUpdate}
            />
          ) : null}
        </div>
        {order.address ? <Address address={order.address} /> : null}
      </div>
    </div>
  );
};

export default OrdersShow;
