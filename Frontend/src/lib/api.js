import axios from "axios";
import { useAuthStore } from "./authStore.js";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL,
  withCredentials: false
});

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const setAuthTokens = ({ accessToken, refreshToken }) => ({
  accessToken,
  refreshToken
});
