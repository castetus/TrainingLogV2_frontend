import { Delete, ZoomOutMap } from "@mui/icons-material";
import { IconButton, ListItem, Stack, TextField, Typography } from "@mui/material";
import type { TrainingExerciseProps } from "./Training.types";

export default function TrainingExercise ({ exercise, onDelete, dragHandleProps }: TrainingExerciseProps) {

  return (
    <>
      <ListItem
        sx={{padding: 0}}
        secondaryAction={
          <>
          <IconButton edge="end" aria-label="delete">
            <Delete onClick={() => onDelete(exercise.exerciseId)} />
          </IconButton>
          <IconButton edge="end" aria-label="move"
            {...dragHandleProps}
            sx={{
              cursor: 'grab',
              touchAction: 'none',
            }}
          >
            <ZoomOutMap />
          </IconButton>
          </>
        }
      >
        <Typography sx={{whiteSpace: 'nowrap'}}>{exercise.exerciseName}</Typography>
        <Stack direction="row" spacing={0}>
          <TextField
            type="number"
            value={exercise.plannedSets}
          />
          <TextField
            type="number"
            value={exercise.plannedSets}
          />
          <TextField
            type="number"
            value={exercise.plannedSets}
          />
        </Stack>

      </ListItem>
    </>
  );
};