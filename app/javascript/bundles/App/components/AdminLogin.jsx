import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import { adminSessionsCreate } from "../api/adminSessions";
import { AuthContext } from "../hooks/useAuth";
import { USER_TYPES } from "../constants";

const AdminLogin = () => {
  const context = useContext(AuthContext)
  const formRef = useRef()

  const handleLogin = () => {
    const formData = new FormData(formRef.current);
    const data = { admin: Object.fromEntries(formData.entries()) };
    adminSessionsCreate(data)
      .then((response) => {
        const token = response.headers.get("Authorization");
        context.login(USER_TYPES.admin, token);
      })
      .catch(() => undefined)
  }

  return (
    <div>
      <h1>Admin Login</h1>
      <form ref={formRef}>
        <label>
          Email: <input name="email" type="text" />
        </label>
        <label>
          Password: <input name="password" type="text" />
        </label>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>

      <Link to={routes.root}>Login as a customer</Link>
      <Link to={routes.signup}>Signup</Link>
    </div>
  )
}

export default AdminLogin;
