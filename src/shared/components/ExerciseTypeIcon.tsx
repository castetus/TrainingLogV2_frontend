import { ExerciseType } from '@/shared/enums';
import { Scale, AvTimer, Repeat } from '@mui/icons-material';

export default function ExerciseTypeIcon({ type }: { type: ExerciseType }) {
  switch (type) {
    case ExerciseType.WEIGHT:
      return <Scale />;

    case ExerciseType.TIME:
      return <AvTimer />;

    case ExerciseType.BASE:
      return <Repeat />;

    default:
      return null;
  }
};