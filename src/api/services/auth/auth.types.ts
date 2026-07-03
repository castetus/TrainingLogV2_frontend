import type { getAuth } from '@/api/generated/auth/auth';
import type {
  GetAuthMeResult,
  PostAuthLoginResult,
  PostAuthRegisterResult,
} from '@/api/generated/auth/auth';

type AuthClient = ReturnType<typeof getAuth>;

export type LoginRequest = Parameters<AuthClient['postAuthLogin']>[0];
export type RegisterRequest = Parameters<AuthClient['postAuthRegister']>[0];
export type GoogleCallbackParams = Parameters<AuthClient['getAuthGoogleCallback']>[0];
export type User = GetAuthMeResult['data']['data'];
export type UserWithToken = PostAuthLoginResult['data']['data']['user'];
export type RegisterResponse = PostAuthRegisterResult['data']['data'];
