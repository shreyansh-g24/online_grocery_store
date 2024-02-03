import { fetchApi } from "../utils"
import { SESSIONS } from "./urls"

export const sessionsCreate = (data) => {
  return fetchApi(SESSIONS.create, data)
}

export const sessionsDestroy = () => {
  return fetchApi(SESSIONS.delete)
}
