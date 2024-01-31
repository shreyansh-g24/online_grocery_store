import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes";

const Signup = () => {
  return (
    <div>
      <h1>Signup</h1>
      <Link to={routes.root}>Login as a customer</Link>
      <Link to={routes.adminLogin}>Login as an admin</Link>
    </div>
  )
}

export default Signup;
