import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import type { WorkoutSetDetailsProps } from "./Workout.types";
import { useEffect, useState } from "react";
import { TaskAltRounded } from "@mui/icons-material";

export default function WorkoutSetForm ({ set, type, onChange }: WorkoutSetDetailsProps) {

  const checkCompleteness = (): boolean => {
    if (!set.reps) {
      return false;
    }
    if (type === 'weight' && !set.weightKg) {
      return false;
    }
    if (type === 'time' && !set.durationSeconds) {
      return false;
    }
    return true;
  };

  const isCompleted = checkCompleteness();

  // useEffect(() => {
  //   onChange(set.id, 'isCompleted', true)
  // }, [isCompleted]);

  return (
    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
      <Typography>{set.setNumber}</Typography>
      <TextField sx={{ width: 90 }} type="number" size="small" slotProps={{
        input: {
          endAdornment: <InputAdornment position="end">{'x'}</InputAdornment>,
        },
      }}
        onChange={(e) =>
          onChange(set.id, 'reps', e.target.value)
        } />
      {type === 'weight' && <TextField sx={{ width: 90 }} type="number" size="small" slotProps={{
        input: {
          endAdornment: <InputAdornment position="end">{'kg'}</InputAdornment>,
        },
      }}
        onChange={(e) =>
          onChange(set.id, 'weightKg', e.target.value)
        } />}
      {type === 'time' && <TextField sx={{ width: 90 }} type="number" size="small" slotProps={{
        input: {
          endAdornment: <InputAdornment position="end">{'s'}</InputAdornment>,
        },
      }}
        onChange={(e) =>
          onChange(set.id, 'durationSeconds', e.target.value)
        } />}

      {isCompleted && <TaskAltRounded sx={{color: 'green'}}/>}
    </Stack>
  );
};