import type { Workout } from "@/api/workouts/workouts.types";

export type WorkoutListProps = {
  workouts: Workout[];
  isLoading: boolean;
  isFetching: boolean;
};