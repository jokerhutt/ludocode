import { useState } from "react";
import { ListRow } from "../../../components/Atoms/Row/ListRow";
import { HollowSlot } from "../../../components/Atoms/Slot/HollowSlot";
import { ListContainer } from "../../../components/Molecules/List/ListContainer";
import type { ExerciseSnap } from "../../../Types/Snapshot/SnapshotTypes";

type BExerciseFormProps = { exercise: ExerciseSnap };

export function BExerciseForm({ exercise }: BExerciseFormProps) {

  const initialDistractors = exercise.options.filter((option) => option.answerOrder == null)  
  const initialCorrect = exercise.options.filter((option) => option.answerOrder != null) 

  const [distractors, setDistractors] = useState(initialDistractors)
  const [correct, setCorrect] = useState(initialCorrect)

  return (
    <>
      <ListContainer title={exercise.title}>
        <ListRow alignment="center">
          <p>{exercise.exerciseType}</p>
        </ListRow>
        <ListRow px="px-4">
          <div className="w-full flex flex-col items-start">
            <p>T: {exercise.title}</p>
          </div>
        </ListRow>
        <ListRow px="px-4">
          <div className="w-full flex flex-col items-start">
            <p>P: {exercise.prompt}</p>
          </div>
        </ListRow>
        <ListRow fill={true} px="px-4" py="py-2">
          <p>Correct: </p>
          <div className="w-full py-2 px-4 items-center flex gap-2">
            {correct.map((option) => (
              <HollowSlot padding="px-6 py-1">
                <span className="">{option.content}</span>
              </HollowSlot>
            ))}
          </div>
        </ListRow>
        <ListRow fill={true} px="px-4" py="py-2">
          <p>Distractors: </p>
          <div className="w-full py-2 px-4 items-center flex gap-2">
            {distractors.map((option) => (
              <HollowSlot padding="px-6 py-1">
                <span className="">{option.content}</span>
              </HollowSlot>
            ))}
          </div>
        </ListRow>
      </ListContainer>
    </>
  );
}
