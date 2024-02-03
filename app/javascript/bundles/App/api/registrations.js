import { toast } from "react-toastify"
import { fetchApi } from "../utils"
import { REGISTRATIONS } from "./urls"

export const registrationsCreate = (data) => {
  return fetchApi(REGISTRATIONS.create, data).then((response) => Promise.resolve(response)).catch(errorObj => {
    const errors = errorObj.errors
    if (errors) {
      const fields = Object.keys(errors)
      fields.forEach(field => {
        const fieldErrors = errors[field]
        fieldErrors.forEach(err => {
          const formattedError = `${field} ${err}`
          toast.error(formattedError)
        })
      })
    }

    return Promise.reject()
  })
}
