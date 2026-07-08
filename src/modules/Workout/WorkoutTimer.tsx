import { useState, useEffect } from "react";
import { convertSecondsToMinutes } from "@/shared/utils/convertSecondsToMinutes";
import type { WorkoutTimerProps } from "./Workout.types";

export default function WorkoutTimer({ time, isRunning, onTick }: WorkoutTimerProps) {

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
    <div>
      <p>{timeToDisplay}</p>
    </div>
  );
};