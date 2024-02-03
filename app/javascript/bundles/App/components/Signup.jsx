import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import routes from "../routes";
import { registrationsCreate } from "../api/registrations";

const Signup = () => {
  const navigate = useNavigate()
  const formRef = useRef();

  const handleSubmit = () => {
    const formData = new FormData(formRef.current)
    const customerData = { sign_up: Object.fromEntries(formData) };
    registrationsCreate(customerData).then(() => {
      navigate(routes.root);
    }).catch(() => undefined);
  }

  return (
    <div>
      <h1>SignUp</h1>
      <form ref={formRef}>
        <label>
          Name: <input name="name" type="text" />
        </label>
        <label>
          Email: <input name="email" type="text" />
        </label>
        <label>
          Password: <input name="password" type="text" />
        </label>
        <label>
          Password confirmation: <input name="password_confirmation" type="text" />
        </label>

        <button type="button" onClick={handleSubmit}>SignUp</button>
      </form>

      <Link to={routes.root}>Login as a customer</Link>
      <Link to={routes.adminLogin}>Login as an admin</Link>
    </div>
  );
};

export default Signup;
