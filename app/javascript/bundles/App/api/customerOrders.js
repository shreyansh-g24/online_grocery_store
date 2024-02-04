import { fetchApi } from "../utils"
import { CUSTOMER_ORDERS } from "./urls"

export const fetchCustomerOrders = () => {
  return fetchApi(CUSTOMER_ORDERS.index)
}

export const createCustomerOrder = () => {
  return fetchApi(CUSTOMER_ORDERS.create)
}

export const fetchCustomerOrder = (id) => {
  return fetchApi(CUSTOMER_ORDERS.show(id))
}

export const updateCustomerOrder = (id, data) => {
  return fetchApi(CUSTOMER_ORDERS.update(id), data)
}
