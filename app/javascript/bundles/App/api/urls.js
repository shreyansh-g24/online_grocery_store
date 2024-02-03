const BASE_API_V1 = "/api/v1"

export const SESSIONS = {
  create: {
    url: `${BASE_API_V1}/sessions`,
    method: "POST"
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
    url: `${BASE_API_V1}/groceries`,
    method: "GET"
  }
};
