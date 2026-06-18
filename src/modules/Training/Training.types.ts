import type { Exercise } from "@/api/exercises/exercises.types";
import type { ExerciseType } from "@/shared/enums";

export type Training = {
  id: string;
  name: string;
}

export type TrainingListProps = {
  trainings: Training[];
  isLoading: boolean;
  isFetching: boolean;
};

export type TrainingExerciseSelectProps = {
  onSelect: (exercise: Exercise | null) => void;
};

export type TrainingExerciseProps = {
  exercise: TrainingExerciseDetails;
  index: number;
  onDelete: (exerciseId: string) => void;
}

export type TrainingExerciseDetails = {
  exerciseId: string;
  exerciseName: string;
  exerciseType: ExerciseType;

  position: number;

  plannedSets?: number;
  plannedReps?: number;
  plannedWeight?: number;
  plannedTime?: number;
};