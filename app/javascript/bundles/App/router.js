import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import Login from "./components/Login";
import Signup from "./components/Signup";
import routes from "./routes";
import { USER_TYPES } from "./constants";
import ErrorPage from "./components/ErrorPage";
import AddressesIndex from "./components/Addresses";
import CustomerLayout from "./components/Customer/Layout";
import AdminDashboard from "./components/Admin/Dashboard";
import AdminLayout from "./components/Admin/Layout";
import OrdersIndex from "./components/Orders";
import OrdersShow from "./components/Orders/show";
import AdminOrdersIndex from "./components/AdminOrders";
import GroceriesIndex from "./components/Groceries";

const getRouter = (loggedInUserType) => {
  let filteredRoutes = []

  switch (loggedInUserType) {
    case USER_TYPES.customer:
      filteredRoutes = filteredRoutes.concat(authenticatedCustomerRoutes);
      break;
    case USER_TYPES.admin:
      filteredRoutes = filteredRoutes.concat(authenticatedAdminRoutes);
      break;
    case USER_TYPES.none:
      filteredRoutes = filteredRoutes.concat(unauthenticatedRoutes);
  }

  filteredRoutes = filteredRoutes.concat(fallbackRoutes)

  return createBrowserRouter(filteredRoutes)
}

const unauthenticatedRoutes = [
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
]

const authenticatedCustomerRoutes = [
  {
    path: routes.customersDashboard,
    element: <CustomerLayout><GroceriesIndex /></CustomerLayout>
  },
  {
    path: routes.customersAddresses,
    element: <CustomerLayout><AddressesIndex /></CustomerLayout>
  },
  {
    path: routes.customersOrders,
    element: <CustomerLayout><OrdersIndex /></CustomerLayout>
  },
  {
    path: routes.customersOrder.route,
    element: <CustomerLayout><OrdersShow /></CustomerLayout>
  }
]

const authenticatedAdminRoutes = [
  {
    path: routes.adminDashboard,
    element: <AdminLayout><AdminDashboard /></AdminLayout>
  },
  {
    path: routes.adminOrders,
    element: <AdminLayout><AdminOrdersIndex /></AdminLayout>
  },
  {
    path: routes.adminOrder.route,
    element: <AdminLayout><OrdersShow /></AdminLayout>
  }
]

const fallbackRoutes = [
  {
    path: "*",
    element: <ErrorPage />
  }
]

export default getRouter;
