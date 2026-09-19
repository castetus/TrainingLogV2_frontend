import { getTrainings } from '@/api/generated/trainings/trainings';
import type { CreateTrainingRequest, UpdateTrainingRequest } from './trainings.types';

const trainingsClient = getTrainings();

export const trainingsService = {
  getTrainings: () =>
    trainingsClient.getTrainings().then((response) => response.data),

  getTrainingById: (id: string) =>
    trainingsClient.getTrainingsId(id).then((response) => response.data),

  createTraining: (body: CreateTrainingRequest) =>
    trainingsClient.postTrainings(body).then((response) => response.data),

  updateTraining: (id: string, body: UpdateTrainingRequest) =>
    trainingsClient.putTrainingsId(id, body),

  deleteTraining: (id: string) =>
    trainingsClient.deleteTrainingsId(id),
};
