import { useExercises } from '@/api/exercises/exercises.queries';
import type { Exercise } from '@/api/exercises/exercises.types';
import { ExerciseType } from '@/shared/enums';
import { Delete, Edit } from '@mui/icons-material';
import { Divider, IconButton, ListItem, Typography } from '@mui/material';

export const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Bench Press',
    description: 'Classic chest exercise with a barbell.',
    type: ExerciseType.WEIGHT,
    createdAt: '2026-06-07T08:00:00.000Z',
    updatedAt: '2026-06-07T08:00:00.000Z',
  },
  {
    id: '2',
    name: 'Plank',
    description: 'Static core exercise held for time.',
    type: ExerciseType.TIME,
    createdAt: '2026-06-07T08:05:00.000Z',
    updatedAt: '2026-06-07T08:05:00.000Z',
  },
  {
    id: '3',
    name: 'Pull-Up',
    description: 'Basic bodyweight pulling exercise.',
    type: ExerciseType.BASE,
    createdAt: '2026-06-07T08:10:00.000Z',
    updatedAt: '2026-06-07T08:10:00.000Z',
  },
];

export default function ExercisesList () {

  // const { data: exercises } = useExercises();
  const exercises = mockExercises;

  return (
    <>
      {
        exercises && exercises.map((exercise: Exercise) => {
          return (
            <>
              <ListItem
                key={exercise.id}
                secondaryAction={
                  <>
                    <IconButton edge="end" aria-label="edit">
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <Delete />
                    </IconButton>

                  </>
                }
              >
                <Typography variant="subtitle2">
                  {exercise.name}
                </Typography>           
              </ListItem>
              <Divider  />
            </>
          );
        })
      }
    </>
  );
};