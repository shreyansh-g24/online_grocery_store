import { toast } from "react-toastify"

export const fetchApi = (urlObj, body) => {
  return fetch(urlObj.url, { method: urlObj.method, body: JSON.stringify(body), headers: { "Content-Type": "application/json", "Accept": "application/json" } })
    .then(response => response.json())
    .then(response => {
      if (response.message) {
        toast(response.message)
      }

      if (!response.errors) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
      }
    })
    .catch(error => {
      if (error.errors && error.errors.constructor === Array) {
        error.errors.forEach(err => err.constructor === String && toast.error(err))
      }

      return Promise.reject(error)
    })
}
