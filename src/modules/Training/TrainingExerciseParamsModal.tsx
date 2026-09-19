import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import type { TrainingExerciseDetails, TrainingExerciseParamsModalProps } from "./Training.types";
import { ExerciseType } from "@/shared/enums";
import { useState, type ChangeEvent } from "react";

export default function TrainingExerciseParamsModal ({
  open,
  handleClose,
  exercise,
  handleSave,
  isEdit = false,
}: TrainingExerciseParamsModalProps) {

  const [form, setForm] = useState<Omit<TrainingExerciseDetails, 'plannedSets'> & {
    plannedSets: number | undefined;
  }>(exercise);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value === '' ? undefined : Number(value),
    }));
  };

  const setsValid = form.plannedSets !== undefined &&
    Number.isInteger(form.plannedSets) && form.plannedSets >= 1;
  const optionalNumbersValid = [form.plannedReps, form.plannedWeight, form.plannedTime]
    .every((value) => value === undefined || Number.isFinite(value));

  const saveExercise = () => {
    if (!setsValid || !optionalNumbersValid || form.plannedSets === undefined) {
      return;
    }
    handleSave({ ...form, plannedSets: form.plannedSets });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{exercise.exerciseName}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{padding: '8px 0'}}>
          <TextField
            label="Sets"
            type="number"
            value={form.plannedSets ?? ''}
            name="plannedSets"
            required
            error={!setsValid}
            helperText={!setsValid ? 'Enter a whole number of sets (at least 1).' : undefined}
            slotProps={{ htmlInput: { min: 1, step: 1 } }}
            onChange={(e) => handleChange(e)}
          />
          {(exercise.exerciseType === ExerciseType.WEIGHT || exercise.exerciseType === ExerciseType.BASE) &&
            <TextField
              label="Reps"
              type="number"
              value={form.plannedReps ?? ''}
              name="plannedReps"
              onChange={(e) => handleChange(e)}
            />
          }
          {exercise.exerciseType === ExerciseType.WEIGHT &&
            <TextField
              label="Weight"
              type="number"
              name="plannedWeight"
              value={form.plannedWeight ?? ''}
              onChange={(e) => handleChange(e)}
            />
          }
          {exercise.exerciseType === ExerciseType.TIME &&
            <TextField
              label="Time"
              type="number"
              name="plannedTime"
              value={form.plannedTime ?? ''}
              onChange={(e) => handleChange(e)}
            />
          }
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={saveExercise}
          disabled={!setsValid || !optionalNumbersValid}
        >
          {isEdit ? 'Save' : 'Add to training'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
