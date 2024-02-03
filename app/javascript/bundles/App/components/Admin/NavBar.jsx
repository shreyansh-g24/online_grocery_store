import React, { useContext } from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { AuthContext } from "../../hooks/useAuth";
import { adminSessionsDestroy } from "../../api/adminSessions";

const AdminNavbar = () => {
  const context = useContext(AuthContext)

  const handleLogout = () => {
    adminSessionsDestroy()
      .then(() => context.logout())
      .catch(() => 0)
  }

  return (
    <div>
      <Link to={routes.adminDashboard}>Groceries</Link>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default AdminNavbar;