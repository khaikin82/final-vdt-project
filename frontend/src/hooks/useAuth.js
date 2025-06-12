// src/hooks/useAuth.js
import { useMemo } from "react";
import authAPI from "../api/authApi";

export const useAuth = () => {
  const user = useMemo(() => authAPI.getCurrentUser(), []);
  const isLoggedIn = !!user;

  return {
    isLoggedIn,
    username: user?.username || null,
    role: user?.role || null,
    user,
    logout: authAPI.logout,
  };
};
