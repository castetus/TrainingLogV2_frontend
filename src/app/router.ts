import ExercisePage from '@/pages/ExercisePage';
import TrainingPage from '@/pages/TrainingPage';
import WorkoutPage from '@/pages/WorkoutPage';
import { createBrowserRouter } from 'react-router';
import App from './App';
import StatisticPage from '@/pages/StatisticPage';
import SettingsPage from '@/pages/SettingsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { Routes } from './routes'; 

export const router = createBrowserRouter([
  {
    path: Routes.HOME,
    Component: App,
    children: [
      {
        index: true,
        Component: WorkoutPage,
      },
      {
        path: Routes.TRAININGS,
        Component: TrainingPage,
      },
      {
        path: Routes.EXERCISES,
        Component: ExercisePage,
      },
      {
        path: Routes.STATISTICS,
        Component: StatisticPage,
      },
      {
        path: Routes.SETTINGS,
        Component: SettingsPage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);