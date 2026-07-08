import { useWorkouts } from "@/api/services/workouts/workouts.queries";
import { routes } from "@/app/routes";
import WorkoutsList from "@/modules/Workout/WorkoutsList";
import AddButton from "@/shared/components/AddButton";
import { useNavigate } from "react-router";

export default function WorkoutPage () {

  const navigate = useNavigate();
    const {
      data: workouts,
      isLoading,
      isFetching
    } = useWorkouts();

  const openWorkoutForm = () => {
    navigate(routes.startWorkout);
  };

  return (
    <>
      {workouts && <WorkoutsList
        workouts={workouts}
        isLoading={isLoading}
        isFetching={isFetching}
      />}

      <AddButton onClick={() => openWorkoutForm()} />
    </>
  );
};