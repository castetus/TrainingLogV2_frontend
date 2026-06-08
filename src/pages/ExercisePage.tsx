import { routes } from '@/app/routes';
import { useExerciseSearch } from '@/hooks/useExerciseSearch';
import ExerciseSearch from '@/modules/Exercise/ExerciseSearch';
import ExercisesList from '@/modules/Exercise/ExercisesList';
import AddButton from '@/shared/components/AddButton';
import { useNavigate } from 'react-router';

export default function ExercisePage() {

  const navigate = useNavigate();

  const openExerciseForm = () => {
    navigate(routes.createExercise);
  };

  const {
    searchString,
    setSearchString,
    exercises,
    isLoading,
    isFetching,
  } = useExerciseSearch();

  return (
    <>
      <ExerciseSearch
        value={searchString}
        onSearch={setSearchString}
      />

      <ExercisesList
        exercises={exercises}
        isLoading={isLoading}
        isFetching={isFetching}
      />

      <AddButton onClick={() => openExerciseForm()} />
    </>
  );
};