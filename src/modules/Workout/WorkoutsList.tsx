import { List, ListItem } from "@mui/material";
import type { WorkoutListProps } from "./Workout.types";
import Loader from "@/shared/components/Loader";
import EmptyState from "@/shared/components/EmptyState";
import { useNavigate } from "react-router";
import { routes } from "@/app/routes";

export default function WorkoutsList ({ workouts, isLoading, isFetching }: WorkoutListProps) {

  const navigate = useNavigate();

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
            <ListItem key={workout.id} onClick={() => navigate(routes.workout(workout.id))}>
              {workout.name}
            </ListItem>
          </List>
        );
      })}
    </>
  );
};