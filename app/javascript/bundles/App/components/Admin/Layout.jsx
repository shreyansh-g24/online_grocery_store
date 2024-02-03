import React from "react";
import AdminNavbar from "./NavBar";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <AdminNavbar />
      {children}
    </div>
  );
};

export default AdminLayout;
