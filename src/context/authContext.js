import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        inputs,
        { withCredentials: true } // Ensure cookies are sent with the request
      );
      console.log(res);

      setCurrentUser(res.data);
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const register = async (inputs) => {
    try {
      await axios.post("http://localhost:8080/api/auth/register", inputs);
    } catch (err) {
      console.error("Regiteration failed", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout failed:", err);
      throw err;
    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
