import React, { createContext, useContext, useMemo, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { clearLocalStorage, getUserTypeLocalStorage, saveUserToLocalStorage } from "../utils";
import getRouter from "../router";
import { USER_TYPES } from "../constants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUserType, setLoggedInUserType] = useState(getUserTypeLocalStorage() || "");

  const login = (userType, token) => {
    setLoggedInUserType(userType);
    saveUserToLocalStorage(token, userType);
  };

  const logout = () => {
    setLoggedInUserType(USER_TYPES.none)
    clearLocalStorage()
  };

  const value = useMemo(
    () => ({
      login,
      logout,
    }),
    [login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      <RouterProvider router={getRouter(loggedInUserType)} />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
