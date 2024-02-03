import { fetchApi } from "../utils"
import { GROCERIES } from "./urls"

export const fetchGroceries = () => {
  return fetchApi(GROCERIES.index)
}

export const createGrocery = (data) => {
  return fetchApi(GROCERIES.create, data)
}

export const updateGrocery = (data, id) => {
  return fetchApi(GROCERIES.update(id), data)
}
