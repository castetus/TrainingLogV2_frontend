import { useWorkout } from "@/api/workouts/workouts.queries";
import Loader from "@/shared/components/Loader";
import { Accordion, Button } from "@mui/material";
import { useParams } from "react-router";

export default function WorkoutDetails () {

  const { workoutId } = useParams();

  const { data: workout, isLoading, isFetching } = useWorkout(workoutId, {
    enabled: Boolean(workoutId),
  });

  if (isLoading || isFetching) {
    return (
      <Loader />
    );
  }
  
  return (
    <>
      <Button></Button>
      <Accordion>
        {workout}
      </Accordion>
    </>
  );
};