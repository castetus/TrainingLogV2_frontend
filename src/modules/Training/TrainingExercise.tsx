import { Delete, Edit, Reorder } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import type { TrainingExerciseProps } from "./Training.types";
import { getTrainingExerciseParamsLabel } from "@/shared/utils/getTrainingExerciseParamsLabel";

export default function TrainingExercise ({ exercise, onDelete, onEdit, dragHandleProps }: TrainingExerciseProps) {

  const paramsLabel = getTrainingExerciseParamsLabel(exercise);

  return (
    <>
      <Card sx={{marginBottom: '4px'}}>
        <CardContent sx={{ padding: 0, paddingBottom: '4px!important' }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>

            <Box sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center'
            }}>

              <IconButton edge="end" aria-label="move"
                {...dragHandleProps}
                sx={{
                  cursor: 'grab',
                  touchAction: 'none',
                }}
              >
                <Reorder />
              </IconButton>
              <Typography>
                {exercise.exerciseName}
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={() => onEdit(exercise.exerciseId)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(exercise.exerciseId)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ pl: 4 }}>
            {paramsLabel}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};