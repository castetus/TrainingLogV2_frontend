import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { exercisesApi } from './exercises';
import type { ExercisesRequestParams } from './exercises.types';

export const exerciseKeys = {
  all: ['exercises'] as const,
  list: (params: ExercisesRequestParams) => [...exerciseKeys.all, 'list', params] as const,
  detail: (id?: string) => [...exerciseKeys.all, 'detail', id] as const,
};

export const useExercises = (params: ExercisesRequestParams) => {
  return useQuery({
    queryKey: exerciseKeys.list(params),
    queryFn: () => exercisesApi.getExercises(params),
  });
};

export const useExercise = (id: string) => {
  return useQuery({
    queryKey: exerciseKeys.detail(id),
    queryFn: () => exercisesApi.getExerciseById(id),
    enabled: Boolean(id),
  });
}

export const useCreateExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: exercisesApi.createExercise,
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
    mutationFn: exercisesApi.updateExercise,
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
    mutationFn: exercisesApi.deleteExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: exerciseKeys.all,
      });
    },
  });
};