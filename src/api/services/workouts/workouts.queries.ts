import { useQuery } from '@tanstack/react-query';
import { workoutsService } from './workouts';

export const workoutsKeys = {
  all: ['workouts'] as const,
  list: () => [...workoutsKeys.all, 'list'] as const,
  detail: (id?: string) => [...workoutsKeys.all, 'detail', id] as const,
};

export const useWorkouts = () => {
  return useQuery({
    queryKey: workoutsKeys.list(),
    queryFn: () => workoutsService.getWorkouts(),
  });
};

export const useWorkout = (id: string | undefined, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: workoutsKeys.detail(id),
    queryFn: () => workoutsService.getWorkoutById(id as string),
    enabled: options?.enabled ?? Boolean(id),
  });
};

export const useWorkoutDetails = (id: string | undefined, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: workoutsKeys.detail(id),
    queryFn: () => workoutsService.getWorkoutDetails(id as string),
    enabled: options?.enabled ?? Boolean(id),
  });
};
