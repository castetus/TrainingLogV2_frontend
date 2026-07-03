import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { exercisesService } from './exercises';
import type { ExercisesRequestParams } from './exercises.types';

export const exerciseKeys = {
  all: ['exercises'] as const,
  list: (params: ExercisesRequestParams) => [...exerciseKeys.all, 'list', params] as const,
  detail: (id?: string) => [...exerciseKeys.all, 'detail', id] as const,
};

export const useExercises = (params: ExercisesRequestParams) => {
  return useQuery({
    queryKey: exerciseKeys.list(params),
    queryFn: () => exercisesService.getExercises(params),
  });
};

export const useExercise = (id: string | undefined, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: exerciseKeys.detail(id),
    queryFn: () => exercisesService.getExerciseById(id as string),
    enabled: options?.enabled ?? Boolean(id),
  });
};

export const useCreateExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: exercisesService.createExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: exerciseKeys.all,
      });
    },
  });
};

export const useUpdateExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof exercisesService.updateExercise>[1] }) =>
      exercisesService.updateExercise(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: exerciseKeys.all,
      });
    },
  });
};

export const useDeleteExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: exercisesService.deleteExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: exerciseKeys.all,
      });
    },
  });
};
