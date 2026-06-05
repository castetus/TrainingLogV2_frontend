import { routes } from '@/app/routes';
import ExerciseSearch from '@/modules/Exercise/ExerciseSearch';
import ExercisesList from '@/modules/Exercise/ExercisesList';
import AddButton from '@/shared/components/AddButton';
import { useNavigate } from 'react-router';

export default function ExercisePage() {

  const navigate = useNavigate();

  const openExerciseForm = () => {
    navigate(routes.createExercise);
  };

  return (
    <>
      <ExerciseSearch />

      <ExercisesList />

      <AddButton onClick={() => openExerciseForm()} />
    </>
  );
};