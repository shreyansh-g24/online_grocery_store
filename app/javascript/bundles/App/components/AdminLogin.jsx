import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import { adminSessionsCreate } from "../api/adminSessions";
import { AuthContext } from "../hooks/useAuth";
import { USER_TYPES } from "../constants";

const AdminLogin = () => {
  const context = useContext(AuthContext);
  const formRef = useRef();

  const handleLogin = () => {
    const formData = new FormData(formRef.current);
    const data = { admin: Object.fromEntries(formData.entries()) };
    adminSessionsCreate(data)
      .then((response) => {
        const token = response.headers.get("Authorization");
        context.login(USER_TYPES.admin, token);
      })
      .catch(() => undefined);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="p-4 border-2 rounded-xl border-black">
        <h1 className="header text-center">Admin Login</h1>
        <form
          ref={formRef}
          className="flex items-center justify-center flex-col mb-4"
        >
          <label className="mb-2">
            Email: <input className="text-input" name="email" type="text" />
          </label>
          <label className="mb-2">
            Password:{" "}
            <input className="text-input" name="password" type="password" />
          </label>
          <button className="btn-primary" type="button" onClick={handleLogin}>
            Login
          </button>
        </form>

        <div className="flex flex-col items-center justify-center">
          <Link className="link" to={routes.root}>Login as a customer</Link>
          <Link className="link" to={routes.signup}>Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
