import { useState, useEffect } from "react";
import { convertSecondsToMinutes } from "@/shared/utils/convertSecondsToMinutes";
import type { WorkoutTimerProps } from "./Workout.types";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { Pause, PlayArrow, Stop } from "@mui/icons-material";

export default function WorkoutTimer({ time, isRunning, onTick, status, onStatusChange }: WorkoutTimerProps) {

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        onTick();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, onTick]);

  const timeToDisplay = convertSecondsToMinutes(time);

  return (
    <Stack direction={'row'} sx={{alignItems: 'center', justifyContent: 'space-between'}}>
      <Typography>{timeToDisplay}</Typography>
      <Box>
        {isRunning && <IconButton
          size="large"
          onClick={() => onStatusChange('paused')}
          color="inherit"
        >
          <Pause />
        </IconButton>}
        {!isRunning && <IconButton
          size="large"
          onClick={() => onStatusChange('in_progress')}
          color="inherit"
        >
          <PlayArrow />
        </IconButton>}
        {status !== 'finished' && status !== 'cancelled' && <IconButton
          size="large"
          onClick={() => onStatusChange('finished')}
          color="inherit"
        >
          <Stop />
        </IconButton>}
      </Box>
    </Stack>
  );
};