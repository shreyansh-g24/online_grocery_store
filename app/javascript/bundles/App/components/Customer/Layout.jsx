import React from "react";
import CustomerNavbar from "./NavBar";

const CustomerLayout = ({ children }) => {
  return (
    <div>
      <CustomerNavbar />
      {children}
    </div>
  );
};

export default CustomerLayout;
