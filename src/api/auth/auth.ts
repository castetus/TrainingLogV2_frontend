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
  register: async (form: { name: string, password: string, email: string }) => {
    const response = await api.post('/auth/register', form);
    return response.data;
  },
  logout: async () => {
    await api.post('/auth/logout');
  },
};