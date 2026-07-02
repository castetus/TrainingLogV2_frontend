import { useWorkoutDetails } from "@/api/workouts/workouts.queries";
import Loader from "@/shared/components/Loader";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import { useParams } from "react-router";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function WorkoutDetails () {

  const { workoutId } = useParams();

  const { data: workout, isLoading, isFetching } = useWorkoutDetails(workoutId, {
    enabled: Boolean(workoutId),
  });

  const buttonText = () => {
    return workout.status;
  };

  if (isLoading || isFetching) {
    return (
      <Loader />
    );
  };
  
  return (
    <>
      <Button variant="contained">
        {buttonText()}
        timer
      </Button>
      {workout && <Accordion>
        {workout.exercises.map((exercise) => {
        return (
          <>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography component="span">{exercise.exerciseName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
          </>
        )
      })}
      </Accordion>}
    </>
  );
};