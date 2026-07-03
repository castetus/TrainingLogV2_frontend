import { useTrainings } from "@/api/services/trainings/trainings.queries";
import { routes } from "@/app/routes";
import TrainingsList from "@/modules/Training/TrainingsList";
import AddButton from "@/shared/components/AddButton";
import { useNavigate } from "react-router";

export default function TrainingPage () {

  const navigate = useNavigate();
  const {
    data: trainings,
    isLoading,
    isFetching
  } = useTrainings();

  const openTrainingForm = () => {
    navigate(routes.createTraining);
  };

  return (
    <>
      <TrainingsList
        trainings={trainings}
        isLoading={isLoading}
        isFetching={isFetching}
      />

      <AddButton onClick={() => openTrainingForm()} />
    </>
  );
};