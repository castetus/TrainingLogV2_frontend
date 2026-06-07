import { useExercise } from '@/api/exercises/exercises.queries';
import { routes } from '@/app/routes';
import { Button, Paper, Typography } from '@mui/material'; 
import { useNavigate } from 'react-router';

export default function ExerciseView ({ id }: { id: string }) {

  const { data: exercise } = useExercise(id);
  const navigate = useNavigate();

  if (!exercise) {
    return null;
  }

  return (
    <Paper elevation={0}>
      <Typography variant="h4" gutterBottom>
        {exercise.name}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {exercise.type}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {exercise.description}
      </Typography>

      <Button
        onClick={() => navigate(routes.editExercise(id))}
      >
        Edit
      </Button>
    </Paper>
  );
};