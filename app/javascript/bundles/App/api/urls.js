const BASE_API_V1_URL = "/api/v1"
const BASE_CUSTOMER_URL = `${BASE_API_V1_URL}/customers`
const BASE_ADMIN_URL = `${BASE_API_V1_URL}/admin`

export const SESSIONS = {
  create: {
    url: `${BASE_CUSTOMER_URL}/sessions`,
    method: "POST"
  },
  delete: {
    url: `${BASE_CUSTOMER_URL}/sessions`,
    method: "DELETE"
  }
};

export const REGISTRATIONS = {
  create: {
    url: "/customers",
    method: "POST"
  }
}

export const GROCERIES = {
  index: {
    url: `${BASE_API_V1_URL}/groceries`,
    method: "GET"
  },
  create: {
    url: `${BASE_ADMIN_URL}/groceries`,
    method: "POST"
  },
  update: (id) => ({
    url: `${BASE_ADMIN_URL}/groceries/${id}`,
    method: "PUT"
  })
};

export const ADDRESSES = {
  index: {
    url: `${BASE_CUSTOMER_URL}/addresses`,
    method: "GET"
  },
  create: {
    url: `${BASE_CUSTOMER_URL}/addresses`,
    method: "POST"
  },
  update: (id) => ({
    url: `${BASE_CUSTOMER_URL}/addresses/${id}`,
    method: "PUT"
  })
}

export const ADMIN_SESSIONS = {
  create: {
    url: `${BASE_ADMIN_URL}/sessions`,
    method: "POST"
  },
  delete: {
    url: `${BASE_ADMIN_URL}/sessions`,
    method: "DELETE"
  }
}
