import axios, { AxiosRequestConfig } from 'axios';
import { Config } from './Config';

const getToken = () => {
  return localStorage.getItem('token');;
};

const apiClient = axios.create({
  baseURL: Config.BASE_API_URL,
  timeout: 30000,
});

// @ts-ignore
apiClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const currentToken = getToken();

  // If there is a token and the request has headers, update the Authorization header
  if (currentToken && config.headers) {
    config.headers['Authorization'] = ` ${currentToken}`;
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

// Response interceptor
apiClient.interceptors.response.use((response: any) => {
  return response;
});

export default apiClient;
