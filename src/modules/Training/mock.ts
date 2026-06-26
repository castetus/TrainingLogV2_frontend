import { ExerciseType } from "@/shared/enums";
import type { TrainingExerciseDetails } from "./Training.types";

export const mockTrainingExercises: TrainingExerciseDetails[] = [
  {
    exerciseId: '1',
    exerciseName: 'Bench Press',
    exerciseType: ExerciseType.WEIGHT,
    position: 1,
    plannedSets: 4,
    plannedReps: 8,
    plannedWeight: 80,
  },
  {
    exerciseId: '2',
    exerciseName: 'Pull Ups',
    exerciseType: ExerciseType.BASE,
    position: 2,
    plannedSets: 4,
    plannedReps: 12,
  },
  {
    exerciseId: '3',
    exerciseName: 'Plank',
    exerciseType: ExerciseType.TIME,
    position: 3,
    plannedSets: 4,
    plannedTime: 90,
  },
  {
    exerciseId: '4',
    exerciseName: 'Dumbbell Curl',
    exerciseType: ExerciseType.WEIGHT,
    position: 4,
    plannedSets: 3,
    plannedReps: 10,
    plannedWeight: 16,
  },
  {
    exerciseId: '5',
    exerciseName: 'Push Ups',
    exerciseType: ExerciseType.BASE,
    position: 5,
    plannedSets: 4,
    plannedReps: 20,
  },
];

export const mockTrainings = [
  {
    id: '1',
    name: 'Chest & Biceps',
  },
  {
    id: '2',
    name: 'Back & Triceps',
  },
  {
    id: '3',
    name: 'Home Workout',
  },
];