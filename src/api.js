import axios from "axios";
import { getToken } from "./auth";

const API_BASE = "https://psotsomnapi.runasp.net/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
