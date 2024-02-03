import { fetchApi } from "../utils"
import { ADDRESSES } from "./urls"

export const fetchAddresses = () => {
  return fetchApi(ADDRESSES.index)
}
