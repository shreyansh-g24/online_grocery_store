import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="text" />
        <input type="text" />
        <input type="submit" />
      </form>

      <Link to={routes.signup}>Signup</Link>
      <Link to={routes.adminLogin}>Login as an Admin</Link>
    </div>
  )
}

export default Login;
