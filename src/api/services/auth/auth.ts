import { api } from '@/api/client';
import { getAuth } from '@/api/generated/auth/auth';

const authClient = getAuth(api);

export const authService = {
  register: (body: Parameters<typeof authClient.postAuthRegister>[0]) =>
    authClient.postAuthRegister(body, {
      skipGlobalErrorHandler: true,
      skipAuthRedirect: true,
    }).then((response) => response.data),

  login: (body: Parameters<typeof authClient.postAuthLogin>[0]) =>
    authClient.postAuthLogin(body, {
      skipGlobalErrorHandler: true,
      skipAuthRedirect: true,
    }).then((response) => response.data),

  getMe: () =>
    authClient.getAuthMe({
      skipGlobalErrorHandler: true,
    }).then((response) => response.data.data),

  logout: () => authClient.postAuthLogout(),
};
