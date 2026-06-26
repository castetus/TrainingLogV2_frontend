import type { Exercise } from "@/api/exercises/exercises.types";
import type { ExerciseType } from "@/shared/enums";
import type { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";

export type Training = {
  id: string;
  name: string;
}

export type TrainingListProps = {
  trainings: Training[];
  isLoading: boolean;
  isFetching: boolean;
};

export type TrainingExerciseSelectProps = {
  onSelect: (exercise: Exercise | null) => void;
};

export type TrainingExerciseProps = {
  exercise: TrainingExerciseDetails;
  index: number;
  onDelete: (exerciseId: string) => void;
  onEdit: (exerciseId: string) => void;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
}

export type TrainingExerciseDetails = {
  exerciseId: string;
  exerciseName: string;
  exerciseType: ExerciseType;

  position: number;

  plannedSets: number;
  plannedReps?: number;
  plannedWeight?: number;
  plannedTime?: number;
};

export type TrainingExerciseParamsModalProps = {
  open: boolean;
  handleClose: () => void;
  exercise: TrainingExerciseDetails;
  handleSave: (exercise: TrainingExerciseDetails) => void;
  isEdit: boolean;
}

export type TrainingFormValues = {
  name: string;
  exercises: TrainingExerciseDetails[];
};