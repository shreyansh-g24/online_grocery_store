import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import { sessionsCreate } from "../api/sessions";
import { AuthContext } from "../hooks/useAuth";
import { USER_TYPES } from "../constants";

const Login = () => {
  const context = useContext(AuthContext);
  const formRef = useRef();
  
  const handleLogin = () => {
    const formData = new FormData(formRef.current);
    const data = { customer: Object.fromEntries(formData.entries()) };
    sessionsCreate(data)
      .then((response) => {
        const token = response.headers.get("Authorization");
        context.login(USER_TYPES.customer, token);
      })
      .catch(() => undefined)
  }

  return (
    <div>
      <h1>Login</h1>
      <form ref={formRef}>
        <label>
          Email: <input name="email" type="text" />
        </label>
        <label>
          Password: <input name="password" type="text" />
        </label>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>

      <Link to={routes.signup}>Signup</Link>
      <Link to={routes.adminLogin}>Login as an Admin</Link>
    </div>
  );
};

export default Login;
