import { ExerciseType } from "@/shared/enums";
import type { ExerciseForm } from "./Exercise.types";

export const getInitialExercise = (): ExerciseForm => ({
  name: '',
  description: '',
  type: ExerciseType.BASE,
});