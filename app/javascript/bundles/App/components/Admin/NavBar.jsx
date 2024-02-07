import React, { useContext } from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { AuthContext } from "../../hooks/useAuth";
import { adminSessionsDestroy } from "../../api/adminSessions";

const AdminNavbar = () => {
  const context = useContext(AuthContext);

  const handleLogout = () => {
    context.logout();
    adminSessionsDestroy();
  };

  return (
    <div className="nav-bar-container">
      <Link className="link" to={routes.adminDashboard}>Groceries</Link>
      <Link className="link" to={routes.adminOrders}>Orders</Link>
      <button className="btn-danger" type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
