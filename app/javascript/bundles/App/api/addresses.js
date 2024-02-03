import { fetchApi } from "../utils"
import { ADDRESSES } from "./urls"

export const fetchAddresses = () => {
  return fetchApi(ADDRESSES.index)
}

export const createAddress = (data) => {
  return fetchApi(ADDRESSES.create, data)
}

export const updateAddress = (data, id) => {
  return fetchApi(ADDRESSES.update(id), data)
}
