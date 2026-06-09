import { api } from '@/api/client';

export const authService = {
  login: async ({ login, password }: { login: string, password: string }) => {
    const response = await api.post('/auth/login', { login, password });
    return response.data;
  },
  register: async () => {},
};