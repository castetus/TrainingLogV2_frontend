import type { TrainingExerciseDetails } from "@/modules/Training/Training.types";
import { convertSecondsToMinutes } from "./convertSecondsToMinutes";
import { ExerciseType } from "@/shared/enums";

export const getTrainingExerciseParamsLabel = (exercise: TrainingExerciseDetails): string => {
    const sets = `${exercise.plannedSets} sets`;
    const reps = exercise.plannedReps !== undefined ? `${exercise.plannedReps} reps` : '';
    const weight = exercise.plannedWeight !== undefined ? `${exercise.plannedWeight} kg` : '';
    const time = exercise.plannedTime !== undefined ? `${convertSecondsToMinutes(exercise.plannedTime)} min` : '';

    let paramsArray = [];
    
    switch (exercise.exerciseType) {
      case ExerciseType.WEIGHT:
        paramsArray = [sets, reps, weight];
        break;
      case ExerciseType.TIME:
        paramsArray = [sets, time];
        break;
      case ExerciseType.BASE:
        paramsArray = [sets, reps];
        break;
      default:
        paramsArray = [sets];
    }

    console.log(exercise, paramsArray)

    return paramsArray.filter((item) => item).join(' x ');
};