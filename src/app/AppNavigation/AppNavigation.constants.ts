import { FitnessCenter, SportsGymnastics, Fitbit, Analytics } from '@mui/icons-material';
import { routes } from '@/app/routes';

export const navigationLinks = [
  {
    path: routes.home,
    icon: Fitbit,
    label: 'Workout',
  },
  {
    path: routes.trainings,
    icon: SportsGymnastics,
    label: 'Trainings',
  },
  {
    path: routes.exercises,
    icon: FitnessCenter,
    label: 'Exercises',
  },
  {
    path: routes.statistics,
    icon: Analytics,
    label: 'Stat',
  },
];