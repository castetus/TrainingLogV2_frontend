import { useNotificationStore } from '@/store';
import axios from 'axios';
import { useAuthStore } from '@/store';
import { routes } from '@/app/routes';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      useAuthStore.getState().logout();

      window.location.href = routes.login;

      return Promise.reject(error);
    }
    if (!error.config?.skipGlobalErrorHandler) {
      useNotificationStore
        .getState()
        .showNotification(error.response?.data?.message ?? 'Network error');
    }

    return Promise.reject(error);
  }
);