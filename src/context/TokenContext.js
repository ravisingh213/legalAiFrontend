// src/context/TokenContext.js

import React, { createContext, useContext, useState, useEffect } from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    // This effect will run when the component mounts
    // You should implement the logic to check for the token here
    // For example, you might want to check for a token in localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Decode the token here
      const decoded = JSON.parse(atob(storedToken.split(".")[1]));
      setDecodedToken(decoded);
    }
  }, []);

  const value = {
    token,
    setToken,
    decodedToken,
    setDecodedToken,
  };

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
