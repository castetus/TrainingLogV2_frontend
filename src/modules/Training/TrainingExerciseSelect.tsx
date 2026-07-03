import { useExerciseSearch } from "@/hooks/useExerciseSearch";
import { Autocomplete, TextField } from "@mui/material";
import type { TrainingExerciseSelectProps } from "./Training.types";
import type { Exercise } from "@/api/services/exercises/exercises.types";

export default function TrainingExerciseSelect ({ onSelect }: TrainingExerciseSelectProps) {

  const {
    searchString,
    setSearchString,
    exercises,
    isLoading,
    isFetching,
  } = useExerciseSearch();

  const handleChange = (value: Exercise | null) => {
    if (!value) {
      return;
    }
    onSelect(value);
    setSearchString('');
  };

  return (
    <>
    <Autocomplete
      disablePortal
      options={exercises}
      loading={isLoading || isFetching}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, value) => handleChange(value)}
      inputValue={searchString}
      onInputChange={(_, value) => setSearchString(value)}
      renderInput={(params) => <TextField {...params} label="Add exercise" />}
    />
    </>
  );
};