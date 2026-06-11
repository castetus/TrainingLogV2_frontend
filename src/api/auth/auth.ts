import { api } from '@/api/client';
import type { User } from '@/store/types';
import type { AxiosResponse } from 'axios';

export const authService = {
  getMe: async () => {
    const response = await api.get<AxiosResponse<User>>('/auth/me', {
      skipGlobalErrorHandler: true,
    });
    return response.data.data;
  },
  login: async ({ login, password }: { login: string, password: string }) => {
    const response = await api.post('/auth/login', { login, password }, {
      skipGlobalErrorHandler: true,
      skipAuthRedirect: true,
    });
    return response.data;
  },
  register: async (form: { name: string, password: string, email: string }) => {
    const response = await api.post('/auth/register', form, {
      skipGlobalErrorHandler: true,
      skipAuthRedirect: true,
    });
    return response.data;
  },
  logout: async () => {
    await api.post('/auth/logout');
  },
};