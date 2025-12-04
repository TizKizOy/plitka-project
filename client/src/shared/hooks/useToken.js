import { useState, useEffect } from "react";

export const useToken = () => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem("accessToken"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return token;
};
