import type { ExerciseType } from "@/shared/enums";

type TrainingExerciseDetails = {
  exerciseId: string;
  exerciseName: string;
  exerciseType: ExerciseType;

  position: number;

  plannedSets?: number;
  plannedReps?: number;
  plannedWeight?: number;
  plannedTime?: number;
};

export type TrainingDetailsResponse = {
  name: string;
  exercises: TrainingExerciseDetails[];
}

export type TrainingCreateRequest = {
  name: string;
  exercises: TrainingExerciseDetails[];
}