import { getWorkouts } from '@/api/generated/workouts/workouts';
import type { CreateWorkoutRequest } from './workouts.types';

const workoutsClient = getWorkouts();

export const workoutsService = {
  getWorkouts: () =>
    workoutsClient.getWorkouts().then((response) => response.data),

  getWorkoutById: (workoutId: string) =>
    workoutsClient.getWorkoutsWorkoutId(workoutId).then((response) => response.data),

  getWorkoutDetails: (workoutId: string) =>
    workoutsClient.getWorkoutsWorkoutIdDetails(workoutId).then((response) => response.data),

  createWorkout: (body: CreateWorkoutRequest) =>
    workoutsClient.postWorkouts(body).then((response) => response.data),

  deleteWorkout: (workoutId: string) =>
    workoutsClient.deleteWorkoutsWorkoutId(workoutId),

  pauseWorkout: (workoutId: string) =>
    workoutsClient.postWorkoutsWorkoutIdPause(workoutId).then((response) => response.data),

  resumeWorkout: (workoutId: string) =>
    workoutsClient.postWorkoutsWorkoutIdResume(workoutId).then((response) => response.data),

  finishWorkout: (workoutId: string) =>
    workoutsClient.postWorkoutsWorkoutIdFinish(workoutId).then((response) => response.data),

  cancelWorkout: (workoutId: string) =>
    workoutsClient.postWorkoutsWorkoutIdCancel(workoutId).then((response) => response.data),
};
