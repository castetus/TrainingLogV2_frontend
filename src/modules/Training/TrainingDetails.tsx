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
import TrainingExerciseParamsModal from "./TrainingExerciseParamsModal";
import type { TrainingExerciseDetails } from "./Training.types";

export default function TrainingDetails () {

  const { trainingId } = useParams();
  const isEdit = Boolean(trainingId);

  const [isParamsModalOpened, setParamsModalOpened] = useState(false);
  const [isEditExercise, setExerciseEditing] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<TrainingExerciseDetails | undefined>();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectKey, setSelectKey] = useState(0);

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

  const { fields, append, remove, move, update } = useFieldArray({
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

  const openParamsModal = (isEdit: boolean = false) => {
    setExerciseEditing(isEdit);
    setParamsModalOpened(true);
  };

  const closeParamsModal = () => {
    setSelectedExercise(undefined);
    setParamsModalOpened(false);
  }

  const onExerciseSave = (exercise: TrainingExerciseDetails) => {
    if (!isEditExercise) {
      append(exercise);
      setSelectKey((key) => key + 1);
    } else {
      update(editingIndex, exercise);
    }
    
    closeParamsModal();
  };

  const handleEdit = (index: number) => {
    const exercise = fields[index];
    setSelectedExercise(exercise);
    setEditingIndex(index);
    openParamsModal(true);
  };

  const handleDelete = (index: number) => {
    remove(index);
  };

  const onExerciseSelect = (exercise: Exercise | null) => {
    if (!exercise) {
      return;
    }

    const exerciseForAdd: TrainingExerciseDetails = {
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      exerciseType: exercise.type,
      position: fields.length + 1,
      plannedSets: 1, 
    };

    setSelectedExercise(exerciseForAdd);

    openParamsModal();
  };
  
  return (
    <>
    <Stack spacing={2}>
      <TrainingExerciseSelect
        key={selectKey}
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
                        onEdit={() => handleEdit(index)}
                        onDelete={() => handleDelete(index)}
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
    {selectedExercise && <TrainingExerciseParamsModal
      isEdit={isEditExercise}
      open={isParamsModalOpened}
      handleClose={() => setParamsModalOpened(false)}
      exercise={selectedExercise}
      handleSave={onExerciseSave}
    />}
    </>
  );
};