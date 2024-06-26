import React from "react";
import AdminNavbar from "./NavBar";

const AdminLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <AdminNavbar />
      <div className="content-container overflow-y-scroll">{children}</div>
    </div>
  );
};

export default AdminLayout;
