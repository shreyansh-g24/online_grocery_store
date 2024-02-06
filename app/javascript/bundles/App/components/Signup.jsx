import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import routes from "../routes";
import { registrationsCreate } from "../api/registrations";

const Signup = () => {
  const navigate = useNavigate();
  const formRef = useRef();

  const handleSubmit = () => {
    const formData = new FormData(formRef.current);
    const customerData = { sign_up: Object.fromEntries(formData) };
    registrationsCreate(customerData)
      .then(() => {
        navigate(routes.root);
      })
      .catch(() => undefined);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="p-4 border-2 rounded-xl border-black">
        <h1 className="header text-center">SignUp</h1>
        <form
          ref={formRef}
          className="flex items-center justify-center flex-col mb-4"
        >
          <label className="mb-2">
            Name: <input className="text-input" name="name" type="text" />
          </label>
          <label className="mb-2">
            Email: <input className="text-input" name="email" type="text" />
          </label>
          <label className="mb-2">
            Password:{" "}
            <input className="text-input" name="password" type="password" />
          </label>
          <label className="mb-2">
            Password confirmation:{" "}
            <input
              className="text-input"
              name="password_confirmation"
              type="password"
            />
          </label>

          <button className="btn-primary" type="button" onClick={handleSubmit}>
            SignUp
          </button>
        </form>

        <div className="flex flex-col items-center justify-center">
          <Link className="link" to={routes.root}>
            Login as a customer
          </Link>
          <Link className="link" to={routes.adminLogin}>
            Login as an admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
