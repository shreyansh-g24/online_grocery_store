const BASE_API_V1_URL = "/api/v1"
const BASE_CUSTOMER_URL = `${BASE_API_V1_URL}/customers`

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
  }
};

export const ADDRESSES = {
  index: {
    url: `${BASE_CUSTOMER_URL}/addresses`,
    method: "GET"
  }
}
