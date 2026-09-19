import { useWorkoutDetails } from "@/api/services/workouts/workouts.queries";
import Loader from "@/shared/components/Loader";
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkoutTimer from "./WorkoutTimer";
import { useCallback, useEffect, useState } from "react";
import { workoutsService } from "@/api/services/workouts/workouts";
import WorkoutSetForm from "./WorkoutSetForm";
import type { WorkoutDetails, WorkoutExercise, WorkoutSetDetails, WorkoutStatus } from "@/api/services/workouts/workouts.types";
import type { EditableSetField } from "./Workout.types";

export default function WorkoutDetails () {

  const { workoutId } = useParams();
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [draft, setDraft] = useState<WorkoutDetails | null>(null);

  const makeDraftSets = (workout: WorkoutDetails) => {
    return {
      ...workout,
      exercises: 
        workout.exercises.map((exercise) => ({
          ...exercise,
          sets: exercise.sets.map((set) => ({
            ...set,
            reps: undefined,
            weightKg: undefined,
            durationSeconds: undefined,
            isCompleted: false,
          }))
        }))
    }
  }

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

  const finishWorkout = () => {

  };

  const { data: workout, isLoading, isFetching } = useWorkoutDetails(workoutId, {
    enabled: Boolean(workoutId),
  });

  useEffect(() => {
    if (!workout) return;

    setDraft(makeDraftSets(workout));

    if (workout.durationMs === 0) {
      startWorkout();
    }
  }, [workout]);

  const makeExercisePlanString = (exercise: WorkoutExercise) => {
    let result = `${exercise.sets.length}`;

    if (exercise.plannedReps) {
      result += ` x ${exercise.plannedReps} reps`;
    }

    if (exercise.plannedWeight) {
      result += ` x ${exercise.plannedWeight} kg`;
    }

    if (exercise.plannedTime) {
      result += ` x ${exercise.plannedTime} s`;
    }
    return result;
  };

  const onStatusChange = (status: WorkoutStatus) => {
    if (status === 'paused') {
      pauseWorkout();
      return;
    }
    if (status === 'in_progress') {
      resumeWorkout();
      return;
    }
    if (status === 'finished') {
      finishWorkout();
      return;
    }
  };

  const handleSetChange = (
    setId: string,
    field: keyof EditableSetField,
    value: string | boolean,
  ) => {
    console.log(field, value)
    setDraft(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        exercises: prev.exercises.map((exercise) => ({
          ...exercise,
          sets: exercise.sets.map((set) =>
            set.id === setId
              ? { ...set, [field]: Number(value) }
              : set
          ),
        })),
      };
    });
  };

  if (isLoading || isFetching) {
    return (
      <Loader />
    );
  };
  
  return (
    <Stack spacing={2}>
        <Box>
          { workout && <WorkoutTimer
            time={time}
            isRunning={isRunning}
            onTick={onTick}
            status={workout.status}
            onStatusChange={onStatusChange}
          /> }
        </Box>
        {draft?.exercises.map((exercise) => {
        return (
          <Accordion key={exercise.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography component="span" sx={{marginRight: '8px'}}>{exercise.exerciseName}</Typography>
              <Typography component="span">{makeExercisePlanString(exercise)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {exercise.sets.map((set) => {
                return <WorkoutSetForm set={set} type={exercise.exerciseType} onChange={handleSetChange}/>
              })}
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Stack>
  );
};