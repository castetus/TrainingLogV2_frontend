import type { WorkoutListProps } from "./Workout.types";

export default function WorkoutsList ({ workouts, isLoading, isFetching }: WorkoutListProps) {
  return (
    <>
      {workouts && workouts.map((workout) => {
        return (
          <></>
        );
      })}
    </>
  );
};