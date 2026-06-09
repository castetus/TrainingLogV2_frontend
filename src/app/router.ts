import ExercisePage from '@/pages/ExercisePage';
import TrainingPage from '@/pages/TrainingPage';
import WorkoutPage from '@/pages/WorkoutPage';
import { createBrowserRouter, redirect } from 'react-router';
import StatisticPage from '@/pages/StatisticPage';
import SettingsPage from '@/pages/SettingsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { routes } from './routes';
import LoginLayout from '@/layouts/LoginLayout';
import MainLayout from '@/layouts/MainLayout';
import ExerciseView from '@/modules/Exercise/ExerciseView';
import ExerciseForm from '@/modules/Exercise/ExerciseForm';
import { useAuthStore } from '@/store';
import { authService } from '@/api/auth/auth';

const authGuard = async (): Promise<undefined> => {
  const isAuthenticated = useAuthStore.getState().isAuth;

  if (!isAuthenticated) {
    const currentUser = await authService.getMe();
    if (!currentUser) {
      throw redirect('/auth');
    }

    useAuthStore.getState().setUser(currentUser);
  }

  return undefined;
};

export const router = createBrowserRouter([
  {
    path: routes.auth,
    Component: LoginLayout,
    children: [
      {
        index: true,
        Component: undefined,
      }
    ]
  },
  {
    path: routes.home,
    loader: authGuard,
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: WorkoutPage,
      },
      {
        path: routes.trainings,
        Component: TrainingPage,
      },
      {
        path: 'exercises',
        children: [
          {
            index: true,
            Component: ExercisePage,
          },
          {
            path: 'new',
            Component: ExerciseForm,
          },
          {
            path: ':exerciseId',
            Component: ExerciseView,
          },
          {
            path: ':exerciseId/edit',
            Component: ExerciseForm,
          },
        ],
      },
      {
        path: routes.statistics,
        Component: StatisticPage,
      },
      {
        path: routes.settings,
        Component: SettingsPage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);