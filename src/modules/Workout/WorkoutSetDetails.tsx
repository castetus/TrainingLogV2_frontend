import { Stack, TextField, Typography } from "@mui/material";
import type { WorkoutSetDetailsProps } from "./Workout.types";

export default function WorkoutSetDetails ({ set }: WorkoutSetDetailsProps) {

  return (
    <Stack direction="row" spacing={2}>
      <Typography>{set.setNumber}</Typography>
      {set.reps && <TextField type="number" />}
      {set.weight && <TextField type="number" />}
      {set.time && <TextField type="number" />}
    </Stack>
  );
};