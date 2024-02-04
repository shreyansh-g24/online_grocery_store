import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { AuthContext } from "../../hooks/useAuth";
import { USER_TYPES } from "../../constants";

const OrderRow = ({ order, index }) => {
  const context = useContext(AuthContext);

  const orderShowRoute = useMemo(() => {
    switch (context.loggedInUserType) {
      case USER_TYPES.admin:
        return routes.adminOrder.routeHelper(order.id);
      case USER_TYPES.customer:
        return routes.customersOrder.routeHelper(order.id);
      default:
        return "";
    }
  }, [context.loggedInUserType]);

  return (
    <Link to={orderShowRoute}>{`Order ${index + 1} - ${order.status}`}</Link>
  );
};

export default OrderRow;
