import React, { useContext } from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { AuthContext } from "../../hooks/useAuth";
import { sessionsDestroy } from "../../api/sessions";

const CustomerNavbar = () => {
  const context = useContext(AuthContext);

  const handleLogout = () => {
    context.logout();
    sessionsDestroy();
  };

  return (
    <div className="nav-bar-container">
      <Link className="link" to={routes.customersDashboard}>Groceries</Link>
      <Link className="link" to={routes.customersAddresses}>Addresses</Link>
      <Link className="link" to={routes.customersOrders}>Orders</Link>
      <button className="btn-danger" type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default CustomerNavbar;
