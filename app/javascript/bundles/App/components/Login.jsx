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
      .catch(() => undefined);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="p-4 border-2 rounded-xl border-black">
        <h1 className="header text-center">Login</h1>
        <form ref={formRef} className="flex items-center justify-center flex-col mb-4">
          <label className="mb-2">
            Email: <input className="text-input" name="email" type="text" />
          </label>
          <label className="mb-2">
            Password: <input className="text-input" name="password" type="password" />
          </label>
          <button className="btn-primary" type="button" onClick={handleLogin}>
            Login
          </button>
        </form>

        <div className="flex flex-col items-center justify-center">
          <Link className="link" to={routes.signup}>
            Signup
          </Link>
          <Link className="link" to={routes.adminLogin}>
            Login as an Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
