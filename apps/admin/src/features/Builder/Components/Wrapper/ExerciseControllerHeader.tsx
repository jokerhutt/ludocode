import { DevInfoDialog } from "@ludocode/design-system/templates/dialog/info-dialog";
import { exTypeInfoContent } from "@/constants/content/infoContent.ts";
import type { ExerciseType } from "@ludocode/types/Exercise/ExerciseType";
import type {
  LessonSnap,
  ModuleSnap,
} from "@ludocode/types/Builder/BuilderSnapshotTypes";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

type ExerciseControllerHeaderProps = {
  exerciseType: ExerciseType | null;
  currentLessonIndex: number;
  currentModuleIndex: number;
  currentLesson: LessonSnap;
  currentModule: ModuleSnap;
};

export function ExerciseControllerHeader({
  exerciseType,
  currentLesson,
  currentModule,
  currentLessonIndex,
  currentModuleIndex,
}: ExerciseControllerHeaderProps) {
  const headerDisplay = exerciseType ?? "None Selected";
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center text-white">
        <h2>
          Module #{currentModuleIndex + 1}: {currentModule.title} | Lesson #
          {currentLessonIndex + 1}: {currentLesson.title}
        </h2>
      </div>
      <div className="w-full gap-4 flex items-center font-bold text-white py-2">
        <h2>Exercise Type: {headerDisplay}</h2>
        <DevInfoDialog content={exTypeInfoContent}>
          <QuestionMarkCircleIcon className="h-4 hover:cursor-pointer hover:text-ludo-accent-muted w-4" />
        </DevInfoDialog>
      </div>
    </div>
  );
}
