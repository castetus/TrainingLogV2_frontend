import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { workouts } from '@/api/generated/workouts/workouts';

const workoutsApi = workouts();

export const workoutsKeys = {
  all: ['trainings'] as const,
  list: () => [...workoutsKeys.all, 'list'] as const,
  detail: (id?: string) => [...workoutsKeys.all, 'detail', id] as const,
};

export const useWorkouts = () => {
  return useQuery({
    queryKey: workoutsKeys.list(),
    queryFn: () => workoutsApi.getWorkouts(),
  });
};

export const useWorkout = (id: string | undefined, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: workoutsKeys.detail(id),
    queryFn: () => workoutsApi.getWorkoutsWorkoutId(id as string),
    enabled: options?.enabled ?? Boolean(id),
  });
};

export const useWorkoutDetails = (id: string | undefined, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: workoutsKeys.detail(id),
    queryFn: () => workoutsApi.getWorkoutsWorkoutIdDetails(id as string),
    enabled: options?.enabled ?? Boolean(id),
  });
};