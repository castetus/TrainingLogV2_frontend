export type Training = {
  id: string;
  name: string;
}

export type TrainingListProps = {
  trainings: Training[];
  isLoading: boolean;
  isFetching: boolean;
};