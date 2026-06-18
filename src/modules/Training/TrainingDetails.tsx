import { useParams } from "react-router";
import TrainingExerciseSelect from "./TrainingExerciseSelect";
import { useEffect, useState } from "react";
import type { Exercise } from "@/api/exercises/exercises.types";
import { useTraining } from "@/api/trainings/trainings.queries";
import TrainingExercise from "./TrainingExercise";
import type { TrainingDetailsResponse } from "@/api/trainings/trainings.types";
import { useFieldArray, useForm } from "react-hook-form";
import { Stack } from "@mui/material";

export default function TrainingDetails () {

  const { trainingId } = useParams();
  const isEdit = Boolean(trainingId);

  const { data: training } = useTraining(trainingId, {
    enabled: isEdit,
  });

  const form = useForm<TrainingDetailsResponse>({
    defaultValues: {
      name: '',
      exercises: [],
    },
  });

  useEffect(() => {
    if (!training) {
      return;
    }
    form.reset({
      name: training.name,
      exercises: training.exercises,
    });
  }, [training]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'exercises',
  });

  const onExerciseSelect = (exercise: Exercise | null) => {
    if (!exercise) {
      return;
    }

    append({
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      exerciseType: exercise.type,
      position: fields.length + 1,
    });
  };
  
  return (
    <Stack spacing={2}>
      <TrainingExerciseSelect
        onSelect={onExerciseSelect}
      />

      {fields.map((field, index) => {
        return (
          <TrainingExercise
            key={field.id}
            exercise={field}
            index={index}
            onDelete={() => remove(index)}
          />
        );
      })}
    </Stack>
  );
};