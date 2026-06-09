export type User = {
  name: string;
  id: string;
};

export interface AuthStore {
  isAuth: boolean;
  setAuth: (isAuth: boolean) => void;
  logout: () => void;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}

export interface NotificationStore {
  isShown: boolean;
  text: string;
  showNotification: ({ text, type }: { text?: string, type?: "success" | "error" }) => void;
  hideNotification: () => void;
}