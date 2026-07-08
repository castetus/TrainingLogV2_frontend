import { useWorkoutDetails } from "@/api/services/workouts/workouts.queries";
import Loader from "@/shared/components/Loader";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkoutTimer from "./WorkoutTimer";
import { useCallback, useEffect, useState } from "react";
import { workoutsService } from "@/api/services/workouts/workouts";
import WorkoutSetDetails from "./WorkoutSetDetails";

export default function WorkoutDetails () {

  const { workoutId } = useParams();
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  const onTick = useCallback(() => {
    setTime(prev => prev + 1);
  }, []);

  const startWorkout = () => {
    if (!workoutId) {
      return;
    }
    workoutsService.resumeWorkout(workoutId);
    setIsRunning(true);
  };

  const pauseWorkout = () => {
    setIsRunning(false);
  };

  const resumeWorkout = () => {
    setIsRunning(true);
  };

  const { data: workout, isLoading, isFetching } = useWorkoutDetails(workoutId, {
    enabled: Boolean(workoutId),
  });

  const buttonText = () => {
    return workout?.status;
  };

  useEffect(() => {
    startWorkout();
  }, []);

  if (isLoading || isFetching) {
    return (
      <Loader />
    );
  };
  
  return (
    <Stack spacing={2}>
      <Button variant="contained">
        <Box>
          {buttonText()}
          <WorkoutTimer time={time} isRunning={isRunning} onTick={onTick} />
        </Box>
      </Button>
        {workout?.exercises.map((exercise) => {
        return (
          <Accordion key={exercise.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography component="span">{exercise.exerciseName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {exercise.sets.map((set) => {
                return <WorkoutSetDetails set={set}/>
              })}
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Stack>
  );
};