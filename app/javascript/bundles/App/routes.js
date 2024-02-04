const routes = {
  root: "/",
  signup: "/signup",
  adminLogin: "/admin-login",

  customersDashboard: "/",
  customersAddresses: "/addresses",
  customersOrders: "/orders",
  customersOrder: {
    routeHelper: (id) => `/orders/${id}`,
    route: "/orders/:orderId"
  },

  adminDashboard: "/",
  adminOrders: "/orders",
  adminOrder: {
    routeHelper: (id) => `/orders/${id}`,
    route: "/orders/:orderId"
  }
}

export default routes;