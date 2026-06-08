import type { ExerciseForm } from '@/modules/Exercise/Exercise.types';
import { api } from '../client';
import type { AxiosResponse } from 'axios';
import type { Exercise, ExercisesRequestParams } from './exercises.types';

export const exercisesApi = {
  getExercises: async (params: ExercisesRequestParams) => {
    const { data } = await api.get<AxiosResponse<Exercise[]>>(`/exercises?search=${params.search}`);
    return data.data;
  },
  getExerciseById: async (id: string) => {
    const { data } = await api.get<AxiosResponse<Exercise>>(`/exercises/${id}`);
    return data.data;
  },
  createExercise: async (payload: ExerciseForm) => {
    const { data } = await api.post('/exercises', payload);
    return data.data;
  },
  updateExercise: async ({ id, payload }: { id: string, payload: ExerciseForm }) => {
    const { data } = await api.patch(`/exercises/${id}`, payload);
    return data.data;
  },
  deleteExercise: async (id: string) => {
    const { data } = await api.delete(`/exercises/${id}`);
    return data.data;
  },
};