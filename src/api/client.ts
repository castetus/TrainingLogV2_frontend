import { useNotificationStore } from '@/store';
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.config?.skipGlobalErrorHandler) {
      useNotificationStore
        .getState()
        .showNotification(error.response?.data?.message ?? 'Network error');
    }

    return Promise.reject(error);
  }
);