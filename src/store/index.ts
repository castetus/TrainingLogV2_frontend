import { create } from 'zustand';
import type { AuthStore, NotificationStore } from './types';

export const useAuthStore = create<AuthStore>((set) => ({
  isAuth: false,
  user: undefined,
  setAuth: () => (isAuth: boolean) => set({ isAuth }),
  logout: () => set(() => ({ isAuth: false, user: undefined })),
  setUser: (user) => set({ user }),
}));

export const useNotificationStore = create<NotificationStore>((set) => ({
  isShown: false,
  text: '',
  showNotification: (text?: string) => set(() => ({ isShown: true, text })),
  hideNotification: () => set(() => ({ isShown: false, text: '' })),
}));