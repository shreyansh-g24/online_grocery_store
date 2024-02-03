import { fetchApi } from "../utils"
import { GROCERIES } from "./urls"

export const fetchGroceries = () => {
  return fetchApi(GROCERIES.index)
}
