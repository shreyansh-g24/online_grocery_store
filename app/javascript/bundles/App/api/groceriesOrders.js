import { fetchApi } from "../utils"
import { GROCERIES_ORDERS } from "./urls"

export const createGroceriesOrder = (data) => {
  return fetchApi(GROCERIES_ORDERS.create, data)
}

export const updateGroceriesOrder = (id, data) => {
  return fetchApi(GROCERIES_ORDERS.update(id), data)
}

export const destroyGroceriesOrder = (id) => {
  return fetchApi(GROCERIES_ORDERS.delete(id))
}
