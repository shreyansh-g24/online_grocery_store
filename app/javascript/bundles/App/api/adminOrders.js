import { fetchApi } from "../utils"
import { ADMIN_ORDERS } from "./urls"

export const fetchOrders = () => {
  return fetchApi(ADMIN_ORDERS.index)
}

export const fetchAdminOrder = (id) => {
  return fetchApi(ADMIN_ORDERS.show(id))
}

export const updateAdminOrder = (id, data) => {
  return fetchApi(ADMIN_ORDERS.update(id), data)
}
