import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { trainingsService } from './trainings';
import type { CreateTrainingRequest } from './trainings.types';

export const trainingsKeys = {
  all: ['trainings'] as const,
  list: () => [...trainingsKeys.all, 'list'] as const,
  detail: (id?: string) => [...trainingsKeys.all, 'detail', id] as const,
};

export const useTrainings = () => {
  return useQuery({
    queryKey: trainingsKeys.list(),
    queryFn: () => trainingsService.getTrainings(),
  });
};

export const useTraining = (id: string | undefined, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: trainingsKeys.detail(id),
    queryFn: () => trainingsService.getTrainingById(id as string),
    enabled: options?.enabled ?? Boolean(id),
  });
};

export const useCreateTraining = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: trainingsService.createTraining,
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
    mutationFn: ({ id, payload }: { id: string; payload: CreateTrainingRequest }) =>
      trainingsService.updateTraining(id, { id, ...payload }),
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
    mutationFn: trainingsService.deleteTraining,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trainingsKeys.all,
      });
    },
  });
};
