import type { LudoModule } from "../../Types/Exercise/LudoModule";
import type { LudoLesson } from "../../Types/Exercise/LudoLesson";
import { LessonRow } from "./LessonRow";

type BuilderLessonContainerProps = {
  currentModule: LudoModule;
  currentLesson: LudoLesson;
  moduleLessons: LudoLesson[];
};

export function BuilderLessonContainer({
  currentModule,
  currentLesson,
  moduleLessons,
}: BuilderLessonContainerProps) {
  return (
    <>
      <div className="border p-4">
        <div className="p-2 border-b bg-ludoGrayLight">
          <p>Module: {currentModule.title}</p>
          <p>Order: {currentModule.orderIndex}</p>
          <p>Lessons: {moduleLessons.length}</p>
        </div>
        {moduleLessons.map((lesson) => (
          <LessonRow
            isSelected={currentLesson.id == lesson.id}
            lesson={lesson}
          />
        ))}
        <div className="py-6 flex items-center justify-center">
          <div className="bg-green-300 rounded-xl px-4 py-2">
            <p>Add Lesson to Module</p>
          </div>
        </div>
      </div>
    </>
  );
}
