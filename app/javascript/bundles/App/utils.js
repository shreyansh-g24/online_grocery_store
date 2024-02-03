import { toast } from "react-toastify"
import { USER_AUTH_TOKEN, USER_AUTH_TYPE } from "./constants"

export const fetchApi = (urlObj, body) => {
  return fetch(urlObj.url, { method: urlObj.method, body: JSON.stringify(body), headers: { "Content-Type": "application/json", "Accept": "application/json" } })
    .then(response => response.json().then(res => ({ ...res, headers: response.headers })))
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
        error.errors.forEach(err => {
          err.constructor === String && toast.error(err)
        })
      }

      return Promise.reject(error)
    })
}

export const saveUserToLocalStorage = (token, type) => {
  localStorage.setItem(USER_AUTH_TOKEN, token);
  localStorage.setItem(USER_AUTH_TYPE, type);
}

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem(USER_AUTH_TOKEN);
}

export const getUserTypeLocalStorage = () => {
  return localStorage.getItem(USER_AUTH_TYPE)
}

export const clearLocalStorage = () => {
  localStorage.clear();
}
