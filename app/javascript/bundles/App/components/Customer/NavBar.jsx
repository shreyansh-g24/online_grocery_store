import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";

const CustomerNavbar = () => {
  return (
    <div>
      <Link to={routes.customersDashboard}>Groceries</Link>
      <Link to={routes.customersAddresses}>Addresses</Link>
      <div>Logout</div>
    </div>
  )
}

export default CustomerNavbar;
