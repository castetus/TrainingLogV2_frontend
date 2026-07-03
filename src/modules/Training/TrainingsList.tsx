import { Divider, IconButton, Link, ListItem } from "@mui/material";
import type { Training, TrainingListProps } from "./Training.types";
import { Delete } from "@mui/icons-material";
import { Fragment, useState } from 'react';
import { useNavigate } from "react-router";
import { routes } from "@/app/routes";
import DeleteModal from "@/shared/components/DeleteModal";
import { useDeleteTraining } from "@/api/services/trainings/trainings.queries";
import Loader from '@/shared/components/Loader';
import EmptyState from "@/shared/components/EmptyState";

export default function TrainingsList ({ trainings, isLoading, isFetching }: TrainingListProps) {

  const navigate = useNavigate();
  const deleteMutation = useDeleteTraining();
  const [isDeleteModalOpened, switchDeleteModal] = useState(false);
  const [trainingToDelete, setTrainingToDelete] = useState<Training>();
  
  const openDeleteModal = (training: Training) => {
    setTrainingToDelete(training);
    switchDeleteModal(true);
  };

  const deleteTraining = async () => {
    if (!trainingToDelete) {
      return;
    }
    try {
      await deleteMutation.mutateAsync(trainingToDelete?.id);
      switchDeleteModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading || isFetching) {
    return (
      <Loader />
    );
  };

  if (!trainings.length) {
    return (
      <EmptyState />
    );
  };

  return (
    <>
      {
        trainings && trainings.map((training: Training) => {
          return (
            <Fragment key={training.id}>
              <ListItem
                sx={{ paddingLeft: '2px' }}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      onClick={() => openDeleteModal(training)}
                    >
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <Link variant="subtitle2" onClick={() => navigate(routes.trainingDetails(training.id))}>
                  {training.name}
                </Link>           
              </ListItem>
              <Divider  />
            </Fragment>
          );
        })
      }
      <DeleteModal
        isOpened={isDeleteModalOpened}
        entityName={trainingToDelete?.name ?? ''}
        onClose={() => switchDeleteModal(false)}
        onDelete={() => deleteTraining()}
      />
    </>
  );
};