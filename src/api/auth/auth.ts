import { api } from '@/api/client';
import type { User } from '@/store/types';

export const authService = {
  getMe: async () => {
    const response = await api.get<User>('/auth/me', {
      skipGlobalErrorHandler: true,
    });
    return response.data;
  },
  login: async ({ login, password }: { login: string, password: string }) => {
    const response = await api.post('/auth/login', { login, password });
    return response.data;
  },
  register: async () => {},
};