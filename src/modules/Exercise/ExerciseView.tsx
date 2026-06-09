import { useExercise } from '@/api/exercises/exercises.queries';
import { routes } from '@/app/routes';
import ExerciseTypeIcon from '@/shared/components/ExerciseTypeIcon';
import { Button, Paper, Typography } from '@mui/material'; 
import { useNavigate, useParams } from 'react-router';

export default function ExerciseView () {

  const { exerciseId } = useParams();

  if (!exerciseId) {
    return null;
  }

  const { data: exercise } = useExercise(exerciseId);
  const navigate = useNavigate();

  if (!exercise) {
    return null;
  }

  return (
    <Paper elevation={0}>
      <Typography variant="h4" gutterBottom>
        {exercise.name}
      </Typography>
      <ExerciseTypeIcon type={exercise.type} />
      <Typography variant="body1" gutterBottom>
        {exercise.description}
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate(routes.editExercise(exerciseId))}
      >
        Edit
      </Button>
    </Paper>
  );
};