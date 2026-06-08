import { useNotificationStore } from '@/store';
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  error => {
    const message =
      error.response?.data?.message ??
      'Unknown error';

    useNotificationStore
      .getState()
      .showNotification(message);

    return Promise.reject(new Error(message));
  }
);