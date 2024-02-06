import React from "react";
import CustomerNavbar from "./NavBar";

const CustomerLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <CustomerNavbar />
      {children}
    </div>
  );
};

export default CustomerLayout;
