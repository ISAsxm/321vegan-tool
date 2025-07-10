import axios from "axios";
import { API_URL } from "@/utils/constants";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const setHeaderToken = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeHeaderToken = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};

const fetchNewToken = async () => {
  try {
    const token = await axiosInstance
      .post(`${API_URL}/auth/refresh`, {}, { skipAuthRefresh: true })
      .then((res) => res.data.access_token);
    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const refreshAuth = async (failedRequest) => {
  const newToken = await fetchNewToken();
  if (newToken) {
    failedRequest.response.config.headers.Authorization = `Bearer ${newToken}`;
    setHeaderToken(newToken);
    return Promise.resolve(newToken);
  } else {
    window.location.href = "/login";
    return Promise.reject();
  }
};

createAuthRefreshInterceptor(axiosInstance, refreshAuth, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});

export default axiosInstance;
