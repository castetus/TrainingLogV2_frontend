import ExercisePage from '@/pages/ExercisePage';
import TrainingPage from '@/pages/TrainingPage';
import WorkoutPage from '@/pages/WorkoutPage';
import { createBrowserRouter, redirect } from 'react-router';
import StatisticPage from '@/pages/StatisticPage';
import SettingsPage from '@/pages/SettingsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { Routes } from './routes'; 
import LoginLayout from '@/layouts/LoginLayout';
import MainLayout from '@/layouts/MainLayout';

const authGuard = (): undefined => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    throw redirect('/auth');
  }

  return undefined;
};

export const router = createBrowserRouter([
  {
    path: Routes.AUTH,
    Component: LoginLayout,
    children: [
      {
        index: true,
        Component: undefined,
      }
    ]
  },
  {
    path: Routes.HOME,
    loader: authGuard,
    Component: MainLayout,
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