import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("token")
      ? localStorage.getItem("token")
      : ""
  );
  const [userName, setUserName] = useState(null);
  const getUserData = () => {
    if (userToken) {
      const decode = jwtDecode(userToken);
      setUserName(decode.userName);
    }
  };
  useEffect(() => {
    userToken ? localStorage.setItem("token", userToken) : localStorage.removeItem("token");
    getUserData();
  }, [userToken]);
  return (
    <UserContext.Provider
      value={{ setUserToken, setUserName, userName, userToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;