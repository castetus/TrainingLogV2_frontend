import type { getWorkouts } from '@/api/generated/workouts/workouts';
import type {
  GetWorkoutsResult,
  GetWorkoutsWorkoutIdDetailsResult,
  GetWorkoutsWorkoutIdResult,
  PostWorkoutsResult,
} from '@/api/generated/workouts/workouts';

type WorkoutsClient = ReturnType<typeof getWorkouts>;

export type CreateWorkoutRequest = Parameters<WorkoutsClient['postWorkouts']>[0];
export type Workout = GetWorkoutsResult['data'][number];
export type WorkoutSummary = GetWorkoutsWorkoutIdResult['data'];
export type WorkoutDetails = GetWorkoutsWorkoutIdDetailsResult['data'];
export type WorkoutExercise = WorkoutDetails['exercises'][number];
export type WorkoutSet = WorkoutExercise['sets'][number];
export type WorkoutStatus = WorkoutDetails['status'];
export type CreateWorkoutResponse = PostWorkoutsResult['data'];
export type { GetWorkoutsWorkoutIdDetails200DataExercisesItemSetsItem as WorkoutSetDetails } from '@/api/generated/model/getWorkoutsWorkoutIdDetails200DataExercisesItemSetsItem';
