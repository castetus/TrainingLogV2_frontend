import TextField from '@mui/material/TextField';
import type { ExerciseSearchProps } from './Exercise.types';

export default function ExerciseSearch ({ value, onSearch }: ExerciseSearchProps) {

  return (
    <TextField
      fullWidth
      label="Search"
      value={value}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};