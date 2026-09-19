import type { AxiosRequestConfig } from 'axios';
import { api } from './client';

export const orvalMutator = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const response = await api.request<T>({ ...config, ...options });

  return response.data;
};
