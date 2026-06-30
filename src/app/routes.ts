export const routes = {
  home: '/',
  startWorkout: '/workout',
  workout: (id: string) => `/workout/${id}`,
  trainings: '/trainings',
  trainingDetails: (id: string) => `/trainings/${id}`,
  createTraining: '/trainings/new',
  exercises: '/exercises',
  exerciseDetails: (id: string) => `/exercises/${id}`,
  createExercise: '/exercises/new',
  editExercise: (id: string) =>
    `/exercises/${id}/edit`,
  statistics: '/statistics',
  settings: '/settings',
  login: '/auth',
  register: '/auth',
};