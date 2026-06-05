import { FitnessCenter, SportsGymnastics, Fitbit, Analytics } from '@mui/icons-material';
import { Routes } from '@/app/routes';

export const navigationLinks = [
  {
    path: Routes.HOME,
    icon: Fitbit,
    label: 'Workout',
  },
  {
    path: Routes.TRAININGS,
    icon: SportsGymnastics,
    label: 'Trainings',
  },
  {
    path: Routes.EXERCISES,
    icon: FitnessCenter,
    label: 'Exercises',
  },
  {
    path: Routes.STATISTICS,
    icon: Analytics,
    label: 'Stat',
  },
];