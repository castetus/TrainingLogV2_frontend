import { TextField, Select, MenuItem, Stack, type SelectChangeEvent, Button } from "@mui/material";
import type { ExerciseForm } from "./Exercise.types";
import { useEffect, useState, type ChangeEvent } from "react";
import { getInitialExercise } from "./Exercise.utils";
import { ExerciseType } from "@/shared/enums";
import { useExercise } from "@/hooks/useExercise";

export default function ExerciseForm ({ id }: { id?: string }) {
  const { exercise } = useExercise(id);

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

  return (
    <form>
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

        <Button variant="contained">
          Save
        </Button>
      </Stack>
    </form>
  );
};