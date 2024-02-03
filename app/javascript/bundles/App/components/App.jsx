import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";

import "./App.module.css";
import { ToastContainer } from "react-toastify";
import { USER_TYPES } from "../constants";
import getRouter from "../router";

const App = () => {
  const [loggedInUserType, setLoggedInUserType] = useState(USER_TYPES.none);

  const login = (userType) => {
    setLoggedInUserType(userType);
  }

  const logout = () => setLoggedInUserType(USER_TYPES.none);

  window.setLoggedInUserType = setLoggedInUserType
  window.loggedInUserType = loggedInUserType

  // const router = useEffect(() => getRouter(loggedInUserType), [loggedInUserType])

  return (
    <div>
      <RouterProvider router={getRouter(loggedInUserType)} />
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default App;
