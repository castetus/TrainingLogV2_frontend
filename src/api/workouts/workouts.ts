import { api } from "@/api/client";
import type { AxiosResponse } from "axios";

export const workoutsApi = {
  getWorkouts: async () => {
    const { data } = await api.get<AxiosResponse<Workout[]>>('/workouts');
    return data.data;
  },
  getWorkoutById: async (id: string) => {
    const { data } = await api.get<AxiosResponse<WorkoutDetailsResponse>>(`/workouts/${id}`);
    return data.data;
  },
  createWorkout: async (payload: WorkoutCreateRequest) => {
    const { data } = await api.post('/workouts', payload);
    return data.data;
  },
  updateWorkout: async ({ id, payload }: { id: string, payload: WorkoutCreateRequest }) => {

    const { data } = await api.put(`/workouts/${id}`, {
      id,
      ...payload,
    });
    return data.data;
  },
  deleteWorkout: async (id: string) => {
    const { data } = await api.delete(`/workouts/${id}`);
    return data.data;
  },
};