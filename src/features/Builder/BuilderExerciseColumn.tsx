import { useState } from "react";
import { ListRow } from "../../components/Atoms/Row/ListRow";
import { ListContainer } from "../../components/Molecules/List/ListContainer";
import { AsideComponent } from "../../Layouts/Aside/AsideComponent";
import type { LessonSnap } from "../../Types/Snapshot/SnapshotTypes";
import { BExerciseForm } from "./BExercises/BExerciseForm";
import { HollowSlot } from "../../components/Atoms/Slot/HollowSlot";

type BuilderExerciseColumnProps = { currentLesson?: LessonSnap };

export function BuilderExerciseColumn({
  currentLesson,
}: BuilderExerciseColumnProps) {
  const exercises = currentLesson!.exercises;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentExercise = exercises[currentIndex];

  return (
    <AsideComponent customSpan="col-start-8 col-end-13" orientation="RIGHT">
      {currentLesson && (
        <div className="flex flex-col px-6 py-8 gap-4">
          <BExerciseForm exercise={currentExercise} />
          <div className="w-full py-2 px-4 rounded-3xl flex bg-ludoGrayLight items-center gap-4">
            {exercises.map((exercise, index) => (
                <HollowSlot onClick={() => setCurrentIndex(index)} active={currentIndex == index} padding="px-6 py-1">
                    <p className="text-white">{index}</p>

                </HollowSlot>
            ))}
          </div>
        </div>
      )}
    </AsideComponent>
  );
}
