import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "../router";

import "./App.module.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
