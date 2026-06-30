import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import type { WorkoutDetailsItemProps } from "./Workout.types";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function WorkoutDetailsItem ({ exerciseName }: WorkoutDetailsItemProps) {
  return (
    <>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography component="span">{exerciseName}</Typography>
      </AccordionSummary>
      <AccordionDetails>

      </AccordionDetails>
    </>
  );
};