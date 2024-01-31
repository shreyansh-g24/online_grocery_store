import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes";

const AdminLogin = () => {
  return (
    <div>
      <h1>Admin Login</h1>
      <Link to={routes.root}>Login as a customer</Link>
      <Link to={routes.signup}>Signup</Link>
    </div>
  )
}

export default AdminLogin;
