import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import Login from "./components/Login";
import Signup from "./components/Signup";
import routes from "./routes";

const router = createBrowserRouter([
  {
    path: routes.root,
    element: <Login />
  },
  {
    path: routes.signup,
    element: <Signup />
  },
  {
    path: routes.adminLogin,
    element: <AdminLogin />
  }
])

export default router;
