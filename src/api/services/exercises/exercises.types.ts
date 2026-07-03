import type { getExercises } from '@/api/generated/exercises/exercises';
import type {
  GetExercisesIdResult,
  GetExercisesResult,
  PatchExercisesIdResult,
  PostExercisesResult,
} from '@/api/generated/exercises/exercises';

type ExercisesClient = ReturnType<typeof getExercises>;

export type ExercisesRequestParams = Parameters<ExercisesClient['getExercises']>[0];
export type CreateExerciseRequest = Parameters<ExercisesClient['postExercises']>[0];
export type UpdateExerciseRequest = Parameters<ExercisesClient['patchExercisesId']>[1];
export type Exercise = GetExercisesResult['data'][number];
export type ExerciseDetails = GetExercisesIdResult['data'];
export type ExerciseType = Exercise['type'];
export type CreateExerciseResponse = PostExercisesResult['data'];
export type UpdateExerciseResponse = PatchExercisesIdResult['data'];
