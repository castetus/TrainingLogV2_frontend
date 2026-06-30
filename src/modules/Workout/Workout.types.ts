import type { Workout } from "@/api/workouts/workouts.types";
import type { TrainingExerciseDetails } from "@/modules/Training/Training.types";

export type WorkoutListProps = {
  workouts: Workout[];
  isLoading: boolean;
  isFetching: boolean;
};

export type WorkoutDetailsItemProps = Omit<TrainingExerciseDetails, 'position'>