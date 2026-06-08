import { useDeleteExercise, useExercises } from '@/api/exercises/exercises.queries';
import type { Exercise } from '@/api/exercises/exercises.types';
import { routes } from '@/app/routes';
import { ExerciseType } from '@/shared/enums';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogTitle, Divider, IconButton, Link, ListItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';

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
  const navigate = useNavigate();
  const deleteMutation = useDeleteExercise();
  const [isDeleteModalOpened, switchDeleteModal] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState<Exercise>();

  const openEditForm = (id: string) => {
    navigate(routes.editExercise(id));
  };

  const openDeleteModal = (id: string) => {
    const exerciseToDelete = exercises.find((exercise) => exercise.id === id);
    setExerciseToDelete(exerciseToDelete);
    switchDeleteModal(true);
  };

  const closeDeleteModal = () => {
    switchDeleteModal(false);
    setTimeout(() => {
      setExerciseToDelete(undefined);
    }, 100);
  };

  const handleDelete = async () => {
    if (!exerciseToDelete) {
      return;
    }
    try {
      await deleteMutation.mutateAsync(exerciseToDelete?.id);
      closeDeleteModal();
    } catch (e) {
      console.log(e);
    }
  };

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
                    <IconButton
                      edge="end"
                      onClick={() => openEditForm(exercise.id)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => openDeleteModal(exercise.id)}
                    >
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <Link variant="subtitle2" onClick={() => navigate(routes.exerciseDetails(exercise.id))}>
                  {exercise.name}
                </Link>           
              </ListItem>
              <Divider  />
            </>
          );
        })
      }
      <Dialog
        open={isDeleteModalOpened}
        onClose={() => closeDeleteModal()}
        role="alertdialog"
      >
        <DialogTitle>
          {`Delete ${exerciseToDelete?.name}?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => closeDeleteModal()} autoFocus>
            Cancel
          </Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};