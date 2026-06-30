import { useTraining, useTrainings } from "@/api/trainings/trainings.queries";
import { Button, List, ListItem, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getTrainingExerciseParamsLabel } from "@/shared/utils/getTrainingExerciseParamsLabel";
import { workoutsApi } from "@/api/workouts/workouts";
import { useNavigate } from "react-router";
import { routes } from "@/app/routes";

export default function WorkoutForm () {

  const navigate = useNavigate();

  const { data: trainings } = useTrainings();

  const [trainingId, setTrainingId] = useState();
  const [workoutName, setWorkoutName] = useState('');

  const { data: trainingDetails } = useTraining(trainingId, {
    enabled: Boolean(trainingId),
  });

  useEffect(() => {
    if (!trainingDetails) {
      return;
    }
    const newWorkoutName = `${trainingDetails.name} | ${new Date().toLocaleDateString()}`;
    setWorkoutName(newWorkoutName);
  }, [trainingDetails])

  const startWorkout = async () => {
    const newWorkout = await workoutsApi.createWorkout({
      name: workoutName,
      trainingId,
    });
    if (newWorkout) {
      navigate(routes.workout(newWorkout.id));
    }
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Workout name"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
      />
      <Select
        label="Training"
        value={trainingId}
        onChange={(e) => setTrainingId(e.target.value)}
      >
        {trainings && trainings.map((training) => {
            return (
              <MenuItem key={training.id} value={training.id}>{training.name}</MenuItem>
            );
          }
        )}
      </Select>
      <Button variant="contained" disabled={!trainingId} onClick={startWorkout}>Start workout</Button>
      {trainingDetails && trainingDetails.exercises.map((exercise) => {
        const paramsLabel = getTrainingExerciseParamsLabel(exercise);
        return (
          <List dense={true}>
            <ListItem dense={true}>
              <Typography>{exercise.exerciseName}</Typography>
              <Typography>{paramsLabel}</Typography>
            </ListItem>
          </List>
        )
      })}
    </Stack>
  );
};