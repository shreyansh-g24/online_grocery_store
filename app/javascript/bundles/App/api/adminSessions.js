import { fetchApi } from "../utils"
import { ADMIN_SESSIONS } from "./urls"

export const adminSessionsCreate = (data) => {
  return fetchApi(ADMIN_SESSIONS.create, data)
}

export const adminSessionsDestroy = () => {
  return fetchApi(ADMIN_SESSIONS.delete)
}
