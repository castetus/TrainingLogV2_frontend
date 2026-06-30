import { List, ListItem } from "@mui/material";
import type { WorkoutListProps } from "./Workout.types";
import Loader from "@/shared/components/Loader";
import EmptyState from "@/shared/components/EmptyState";

export default function WorkoutsList ({ workouts, isLoading, isFetching }: WorkoutListProps) {

    if (isLoading || isFetching) {
      return (
        <Loader />
      );
    };
  
    if (!workouts.length) {
      return (
        <EmptyState />
      );
    };
  return (
    <>
      {workouts && workouts.map((workout) => {
        return (
          <List>
            <ListItem>
              {workout.name}
            </ListItem>
          </List>
        );
      })}
    </>
  );
};