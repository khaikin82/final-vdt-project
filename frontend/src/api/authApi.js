// src/api/authApi.jsx
import apiClient from "./apiClient";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "jwtToken";

const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const parseToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid JWT token:", error);
    return null;
  }
};

const authAPI = {
  register: (registerRequest) => {
    const url = "/v1/auth/register";
    return apiClient.post(url, registerRequest);
  },

  login: (loginRequest) => {
    const url = "/v1/auth/login";
    return apiClient.post(url, loginRequest).then((data) => {
      console.log("Login response:", data);

      if (data.token) {
        saveToken(data.token);

        const payload = parseToken(data.token);
        if (payload) {
          const username = payload.sub || payload.username || null;
          const role = payload.role || null;

          console.log("Username:", username);
          console.log("Role:", role);

          // Trả về object user gồm username + role
          return { username, role };
        }
      }

      // Nếu không có token hoặc lỗi, trả về null
      return null;
    });
  },

  logout: () => {
    const url = "/v1/auth/logout";
    return apiClient.post(url).finally(() => {
      clearToken();
    });
  },

  getCurrentUser: () => {
    const token = getToken();
    if (!token) return null;

    const payload = parseToken(token);
    if (!payload) return null;

    return {
      username: payload.sub || payload.username || null,
      role: payload.role || null,
    };
  },

  isLoggedIn: () => {
    return !!getToken();
  },
};

export default authAPI;
