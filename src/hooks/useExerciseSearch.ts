import { useExercises } from '@/api/exercises/exercises.queries';
import { useDebouncedValue } from '@/shared/utils/useDebouncedValue';
import { useState } from 'react';

export const useExerciseSearch = () => {
  const [searchString, setSearchString] = useState('');

  const debouncedSearch = useDebouncedValue(searchString, 500);

  const exercisesQuery = useExercises({
    search: debouncedSearch,
  });

  return {
    searchString,
    setSearchString,
    debouncedSearch,
    exercises: exercisesQuery.data ?? [],
    isLoading: exercisesQuery.isLoading,
    isFetching: exercisesQuery.isFetching,
    error: exercisesQuery.error,
  };
};