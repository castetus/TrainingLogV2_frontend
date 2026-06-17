import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { trainingsApi } from './trainings';

export const trainingsKeys = {
  all: ['trainings'] as const,
  list: () => [...trainingsKeys.all, 'list'] as const,
  detail: (id?: string) => [...trainingsKeys.all, 'detail', id] as const,
};

export const useTrainings = () => {
  return useQuery({
    queryKey: trainingsKeys.list(),
    queryFn: () => trainingsApi.getTrainings(),
  });
};

export const useTraining = (id: string | undefined, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: trainingsKeys.detail(id),
    queryFn: () => trainingsApi.getTrainingById(id as string),
    enabled: options?.enabled ?? Boolean(id),
  });
}

export const useCreateTraining = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: trainingsApi.createTraining,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trainingsKeys.all,
      });
    },
  });
};

export const useUpdateTraining = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: trainingsApi.updateTraining,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trainingsKeys.all,
      });
    },
  });
};

export const useDeleteTraining = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: trainingsApi.deleteTraining,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trainingsKeys.all,
      });
    },
  });
};