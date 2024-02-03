import React from "react";

import "./App.module.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../hooks/useAuth";

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer position="bottom-left" />
    </AuthProvider>
  );
};

export default App;
