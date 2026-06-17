import { useDeleteExercise } from '@/api/exercises/exercises.queries';
import type { Exercise } from '@/api/exercises/exercises.types';
import { routes } from '@/app/routes';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogTitle, Divider, IconButton, Link, ListItem, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router';
import type { ExercisesListProps } from './Exercise.types';
import ExerciseTypeIcon from '@/shared/components/ExerciseTypeIcon';
import DeleteModal from '@/shared/components/DeleteModal';

export default function ExercisesList ({ exercises, isLoading, isFetching }: ExercisesListProps) {

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
            <Fragment key={exercise.id}>
              <ListItem
                sx={{ paddingLeft: '2px' }}
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
                <ExerciseTypeIcon type={exercise.type} />
                <Link variant="subtitle2" onClick={() => navigate(routes.exerciseDetails(exercise.id))}>
                  {exercise.name}
                </Link>           
              </ListItem>
              <Divider  />
            </Fragment>
          );
        })
      }
      <DeleteModal
        isOpened={isDeleteModalOpened}
        entityName={exerciseToDelete?.name ?? ''}
        onClose={() => closeDeleteModal()}
        onDelete={() => handleDelete()}
      />
    </>
  );
};