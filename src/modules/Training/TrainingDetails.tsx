import { useParams } from "react-router";

export default function TrainingDetails () {

  const { trainingId } = useParams();
  const isEdit = Boolean(trainingId);
  
  return (
    <>{trainingId}</>
  );
};