import { api } from '@/api/client';
import { getExercises } from '@/api/generated/exercises/exercises';
import type {
  CreateExerciseRequest,
  ExercisesRequestParams,
  UpdateExerciseRequest,
} from './exercises.types';

const exercisesClient = getExercises(api);

export const exercisesService = {
  getExercises: (params?: ExercisesRequestParams) =>
    exercisesClient.getExercises(params).then((response) => response.data),

  getExerciseById: (id: string) =>
    exercisesClient.getExercisesId(id).then((response) => response.data),

  createExercise: (body: CreateExerciseRequest) =>
    exercisesClient.postExercises(body).then((response) => response.data),

  updateExercise: (id: string, body: UpdateExerciseRequest) =>
    exercisesClient.patchExercisesId(id, body).then((response) => response.data),

  deleteExercise: (id: string) =>
    exercisesClient.deleteExercisesId(id),
};
