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
    <div>
      <Link to={routes.customersDashboard}>Groceries</Link>
      <Link to={routes.customersAddresses}>Addresses</Link>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default CustomerNavbar;
