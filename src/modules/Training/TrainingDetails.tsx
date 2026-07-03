import { useParams } from "react-router";
import TrainingExerciseSelect from "./TrainingExerciseSelect";
import { useEffect, useState } from "react";
import type { Exercise } from "@/api/services/exercises/exercises.types";
import { useTraining, useCreateTraining, useUpdateTraining } from "@/api/services/trainings/trainings.queries";
import TrainingExercise from "./TrainingExercise";
import { useFieldArray, useForm } from "react-hook-form";
import { Box, Fab, Stack, TextField } from "@mui/material";
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import TrainingExerciseParamsModal from "./TrainingExerciseParamsModal";
import type { TrainingExerciseDetails, TrainingFormValues } from "./Training.types";

export default function TrainingDetails () {

  const { trainingId } = useParams();
  const isEdit = Boolean(trainingId);

  const createMutation = useCreateTraining();
  const updateMutation = useUpdateTraining();

  const [isParamsModalOpened, setParamsModalOpened] = useState(false);
  const [isEditExercise, setExerciseEditing] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<TrainingExerciseDetails | undefined>();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectKey, setSelectKey] = useState(0);

  const { data: training } = useTraining(trainingId, {
    enabled: isEdit,
  });

  const form = useForm<TrainingFormValues>({
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

  const mapFormToPayload = (values: TrainingFormValues) => ({
    name: values.name,
    exercises: values.exercises.map((exercise, index) => ({
      ...exercise,
      position: index + 1,
    })),
  });

  const saveTraining = async (values: TrainingFormValues) => {
    const payload = mapFormToPayload(values);
    try {
      if (isEdit) {
        await updateMutation.mutateAsync({
          id: trainingId,
          payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }

      form.reset(values);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <form>
    <Stack spacing={2}>
      <TextField {...form.register('name')} />
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
      {form.formState.isDirty &&
        <Fab
          color="primary"
          aria-label="save"
          variant="extended"
          sx={{
            position: 'fixed',
            bottom: '72px',
            left: '50%',
            transform: 'translate(-50%)',
          }}
          onClick={() => saveTraining(form.getValues())}
        >
          Save changes
        </Fab>}
    </form>
  );
};