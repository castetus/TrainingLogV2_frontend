import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, type SelectChangeEvent } from "@mui/material";
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

  const [form, setForm] = useState<TrainingExerciseDetails>(exercise);

    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
      const { name, value } = e.target;
    
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{exercise.exerciseName}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{padding: '8px 0'}}>
          <TextField
            label="Sets"
            type="number"
            value={form.plannedSets}
            name="plannedSets"
            onChange={(e) => handleChange(e)}
          />
          {(exercise.exerciseType === ExerciseType.WEIGHT || exercise.exerciseType === ExerciseType.BASE) &&
            <TextField
              label="Reps"
              type="number"
              value={form.plannedReps}
              name="plannedReps"
              onChange={(e) => handleChange(e)}
            />
          }
          {exercise.exerciseType === ExerciseType.WEIGHT &&
            <TextField
              label="Weight"
              type="number"
              name="plannedWeight"
              value={form.plannedWeight}
              onChange={(e) => handleChange(e)}
            />
          }
          {exercise.exerciseType === ExerciseType.TIME &&
            <TextField
              label="Time"
              type="number"
              name="plannedTime"
              value={form.plannedTime}
              onChange={(e) => handleChange(e)}
            />
          }
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => handleSave(form)}
        >
          {isEdit ? 'Save' : 'Add to training'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};