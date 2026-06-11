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
    if (status === 401 && !error.config?.skipAuthRedirect) {
      useAuthStore.getState().logout();

      window.location.href = routes.login;

      return Promise.reject(error);
    }
    if (!error.config?.skipGlobalErrorHandler) {
      console.log('API Error:', error, 'Response:', error.response);
      useNotificationStore
        .getState()
        .showNotification({ text: error.response?.data?.message ?? 'Network error', type: 'error' });
      console.log('notification state after:', useNotificationStore.getState());
    }


    return Promise.reject(error);
  }
);