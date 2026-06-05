import { createBrowserRouter } from 'react-router';

import App from '@/app/App';
import ExercisesPage from '@/pages/ExercisePage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: 'exercises',
        Component: ExercisesPage,
      },
    ],
  },
]);