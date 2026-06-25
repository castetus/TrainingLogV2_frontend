import { Delete, Reorder } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton, ListItem, Stack, Typography } from "@mui/material";
import type { TrainingExerciseProps } from "./Training.types";
import { ExerciseType } from "@/shared/enums";
import { convertSecondsToMinutes } from "@/shared/utils/convertSecondsToMinutes";

export default function TrainingExercise ({ exercise, onDelete, dragHandleProps }: TrainingExerciseProps) {

  const paramsLabel = () => {
    let paramsString = `${exercise.plannedSets} sets`
    switch (exercise.exerciseType) {
      case ExerciseType.WEIGHT:
        return `${paramsString} x ${exercise.plannedReps} reps x ${exercise.plannedWeight} kg`;
      case ExerciseType.TIME:
        return `${paramsString} x ${convertSecondsToMinutes(exercise.plannedTime)} min`;
      case ExerciseType.BASE:
        return `${paramsString} x ${exercise.plannedReps} reps`;
      default:
        return paramsString;
    }
  };

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



            <IconButton onClick={() => onDelete(exercise.exerciseId)}>
              <Delete />
            </IconButton>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ pl: 4 }}>
            {paramsLabel()}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};