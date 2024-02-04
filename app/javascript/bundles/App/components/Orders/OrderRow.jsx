import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";

const OrderRow = ({ order, index }) => {
  return <Link to={routes.customersOrder.routeHelper(order.id)}>{`Order ${index + 1} - ${order.status}`}</Link>;
};

export default OrderRow;
