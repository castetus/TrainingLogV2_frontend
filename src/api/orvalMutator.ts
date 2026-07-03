import type { AxiosRequestConfig } from 'axios';
import { api } from './client';

export const orvalMutator = async <T>(
  config: AxiosRequestConfig,
): Promise<T> => {
  const response = await api.request<T>(config);

  return response.data;
};
