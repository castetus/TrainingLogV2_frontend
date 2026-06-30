import { api } from "@/api/client";
import type { AxiosResponse } from "axios";
import type { TrainingCreateRequest, TrainingDetailsResponse } from "./trainings.types";
import type { Training } from "@/modules/Training/Training.types";

export const trainingsApi = {
  getTrainings: async () => {
    const { data } = await api.get<AxiosResponse<Training[]>>('/trainings');
    return data.data;
  },
  getTrainingById: async (id: string) => {
    const { data } = await api.get<AxiosResponse<TrainingDetailsResponse>>(`/trainings/${id}`);
    return data.data;
  },
  createTraining: async (payload: TrainingCreateRequest) => {
    const { data } = await api.post('/trainings', payload);
    return data.data;
  },
  updateTraining: async ({ id, payload }: { id: string, payload: TrainingCreateRequest }) => {

    const { data } = await api.put(`/trainings/${id}`, {
      id,
      ...payload,
    });
    return data.data;
  },
  deleteTraining: async (id: string) => {
    const { data } = await api.delete(`/trainings/${id}`);
    return data.data;
  },
};