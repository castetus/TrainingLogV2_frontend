import { create } from 'zustand';
import type { AuthStore } from './types';

export const useAuthStore = create<AuthStore>((set) => ({
  isAuth: false,
  user: undefined,
  setAuth: () => (isAuth: boolean) => set({ isAuth }),
  logout: () => set(() => ({ isAuth: false, user: undefined })),
  setUser: (user) => set({ user }),
}));

