import { useParams } from "react-router";
import TrainingExerciseSelect from "./TrainingExerciseSelect";
import { useEffect, useState } from "react";
import type { Exercise } from "@/api/exercises/exercises.types";
import { useTraining } from "@/api/trainings/trainings.queries";
import TrainingExercise from "./TrainingExercise";
import type { TrainingDetailsResponse } from "@/api/trainings/trainings.types";
import { useFieldArray, useForm } from "react-hook-form";
import { Box, Stack } from "@mui/material";
import { mockTrainingExercises } from "./mock";
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';

export default function TrainingDetails () {

  const { trainingId } = useParams();
  const isEdit = Boolean(trainingId);

  const { data: training } = useTraining(trainingId, {
    enabled: isEdit,
  });

  const form = useForm<TrainingDetailsResponse>({
    defaultValues: {
      name: '',
      exercises: mockTrainingExercises,
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

  const handleDragEnd = (dropResult: DropResult) => {
    const { source, destination } = dropResult;
    if (!destination || source.index === destination.index) {
      return;
    }
    move(source.index, destination.index);
  };

  const onExerciseSelect = (exercise: Exercise | null) => {
    if (!exercise) {
      return;
    }

    append({
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      exerciseType: exercise.type,
      position: fields.length + 1,
      plannedSets: 1,
    });
  };
  
  return (
    <Stack spacing={2}>
      <TrainingExerciseSelect
        onSelect={onExerciseSelect}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="training-exercises">
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {fields.map((field, index) => (
                <Draggable
                  key={field.exerciseId}
                  draggableId={field.exerciseId}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <TrainingExercise
                        dragHandleProps={provided.dragHandleProps}
                        exercise={field}
                        index={index}
                        onDelete={() => remove(index)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Stack>
  );
};