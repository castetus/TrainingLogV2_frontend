import type { ExerciseType } from "@/api/services/exercises/exercises.types";
import type { Workout, WorkoutSetDetails, WorkoutStatus } from "@/api/services/workouts/workouts.types";
import type { TrainingExerciseDetails } from "@/modules/Training/Training.types";

export type WorkoutListProps = {
  workouts: Workout[];
  isLoading: boolean;
  isFetching: boolean;
};

export type WorkoutDetailsItemProps = Omit<TrainingExerciseDetails, 'position'>;

export type WorkoutTimerProps = {
  time: number;
  isRunning: boolean;
  onTick: () => void;
  status?: WorkoutStatus;
  onStatusChange: (newStatus: WorkoutStatus) => void;
};

export type WorkoutSetDetailsProps = {
  set: WorkoutSetDetails;
  type: ExerciseType;
  onChange: (
    setId: string,
    field: keyof EditableSetField,
    value: string | boolean,
  ) => void;
};

export type EditableSetField = Pick<WorkoutSetDetails, 'reps' | 'weightKg' | 'durationSeconds' | 'isCompleted'>;