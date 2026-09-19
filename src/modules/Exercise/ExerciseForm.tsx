import { TextField, Select, MenuItem, Stack, type SelectChangeEvent, Button } from "@mui/material";
import type { ExerciseForm } from "./Exercise.types";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { getInitialExercise } from "./Exercise.utils";
import { ExerciseType } from "@/shared/enums";
import { useExercise, useCreateExercise, useUpdateExercise } from "@/api/services/exercises/exercises.queries";
import { useNavigate, useParams } from "react-router";
import { routes } from "@/app/routes";

export default function ExerciseForm () {

  const { exerciseId } = useParams();
  const isEditMode = Boolean(exerciseId);

  const navigate = useNavigate();

  const [form, setForm] = useState<ExerciseForm>(getInitialExercise());

  const { data: exercise } = useExercise(exerciseId, {
    enabled: isEditMode,
  });
  
  const createMutation = useCreateExercise();
  const updateMutation = useUpdateExercise();


  useEffect(() => {
    if (!exercise) return;

    setForm({ ...exercise, description: exercise.description ?? '' });
  }, [exercise]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
  
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const canSubmit = form.name.trim().length > 0;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) {
      return;
    }

    try {
      if (exerciseId) {
        await updateMutation.mutateAsync({
          id:exerciseId,
          payload: form,
        });
      } else {
        await createMutation.mutateAsync(form);
      }

      navigate(routes.exercises);
    } catch (error) {
      console.error(error);
      console.log('ERROR')
      // показать ошибку пользователю
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Stack spacing={2}>
      <TextField
        value={form.name}
        label="Exercise name"
        name="name"
        onChange={(e) => handleChange(e)}
      />

      <Select
        value={form.type}
        name="type"
        onChange={(e) => handleChange(e)}
      >
        {Object.values(ExerciseType).map((item) => {
          return <MenuItem
            key={item}
            value={item}
          >
            {item}
          </MenuItem>
        })}
      </Select>

        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={(e) => handleChange(e)}
          multiline
          rows={4}
        />

        <Button variant="contained" type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
};