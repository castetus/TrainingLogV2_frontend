export const ExerciseType = {
  WEIGHT: 'weight',
  TIME: 'time',
  BASE: 'base',
} as const;

export type ExerciseType = typeof ExerciseType[keyof typeof ExerciseType];
