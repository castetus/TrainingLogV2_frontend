import type { getTrainings } from '@/api/generated/trainings/trainings';
import type {
  GetTrainingsIdResult,
  GetTrainingsResult,
  PostTrainingsResult,
} from '@/api/generated/trainings/trainings';

type TrainingsClient = ReturnType<typeof getTrainings>;

export type CreateTrainingRequest = Parameters<TrainingsClient['postTrainings']>[0];
export type UpdateTrainingRequest = Parameters<TrainingsClient['putTrainingsId']>[1];
export type Training = GetTrainingsResult['data'][number];
export type TrainingDetails = GetTrainingsIdResult['data'];
export type TrainingExercise = TrainingDetails['exercises'][number];
export type TrainingExerciseRequest = CreateTrainingRequest['exercises'][number];
export type CreateTrainingResponse = PostTrainingsResult['data'];
