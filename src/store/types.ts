export type User = {
  name: string;
  ud: string;
};

export interface AuthStore {
  isAuth: boolean;
  setAuth: (isAuth: boolean) => void;
  logout: () => void;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}