import { TextField, Select, MenuItem, Stack, type SelectChangeEvent, Button } from "@mui/material";
import type { ExerciseForm } from "./Exercise.types";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { getInitialExercise } from "./Exercise.utils";
import { ExerciseType } from "@/shared/enums";
import { useExercise, useCreateExercise, useUpdateExercise } from "@/api/exercises/exercises.queries";
import { useNavigate } from "react-router";
import { routes } from "@/app/routes";

export default function ExerciseForm ({ id }: { id?: string }) {
  const navigate = useNavigate();
  const { data: exercise } = useExercise(id);
  const createMutation = useCreateExercise();
  const updateMutation = useUpdateExercise();

  useEffect(() => {
    if (!exercise) return;

    setForm({...exercise});
  }, [exercise]);

  const [form, setForm] = useState<ExerciseForm>(getInitialExercise());

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
      if (id) {
        await updateMutation.mutateAsync({
          id,
          payload: form,
        });
      } else {
        await createMutation.mutateAsync(form);
      }

      navigate(routes.exercises);
    } catch (error) {
      console.error(error);
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