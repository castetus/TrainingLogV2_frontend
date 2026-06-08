import type { Exercise } from "@/api/exercises/exercises.types";
import type { ExerciseType } from "@/shared/enums";

export type ExerciseForm = {
  name: string;
  description: string;
  type: ExerciseType;
};

export type ExerciseSearchProps = {
  onSearch: (search: string) => void;
  value: string;
};

export type ExercisesListProps = {
  exercises: Exercise[];
  isLoading: boolean;
  isFetching: boolean;
};