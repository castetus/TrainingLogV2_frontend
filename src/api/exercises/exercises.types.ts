import type { ExerciseType } from "@/shared/enums";

export type Exercise = {
  id: string;
  name: string;
  description: string;
  type: ExerciseType;
  createdAt: string;
  updatedAt: string;
}

export type ExercisesRequestParams = {
  search?: string;
}