import ExercisePage from '@/pages/ExercisePage';
import TrainingPage from '@/pages/TrainingPage';
import WorkoutPage from '@/pages/WorkoutPage';
import { createBrowserRouter } from 'react-router';
import App from './App';
import StatisticPage from '@/pages/StatisticPage';
import SettingsPage from '@/pages/SettingsPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: WorkoutPage,
      },
      {
        path: 'training',
        Component: TrainingPage,
      },
      {
        path: 'exercises',
        Component: ExercisePage,
      },
      {
        path: 'statistics',
        Component: StatisticPage,
      },
      {
        path: 'settings',
        Component: SettingsPage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);