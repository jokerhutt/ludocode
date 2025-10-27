import { ListRow } from "../../components/Atoms/Row/ListRow";
import { ListContainer } from "../../components/Molecules/List/ListContainer";
import type { LessonSnap } from "../../Types/Snapshot/SnapshotTypes";

type BuilderLessonContentProps = {
  lessons: LessonSnap[];
  moduleId: string;
  currentLesson: LessonSnap;
  changeSelectedLesson: (lesson: LessonSnap) => void;
};

export function BuilderLessonContent({
  lessons,
  moduleId,
  currentLesson,
  changeSelectedLesson,
}: BuilderLessonContentProps) {
  return (
    <div className="col-start-4 col-end-8 overflow-auto flex flex-col gap-10 lg:gap-8 items-center px-8 py-14 min-w-0">
      <ListContainer title="Lessons">
        {lessons.map((lesson) => (
          <ListRow
            onClick={() => changeSelectedLesson(lesson)}
            px={"px-6"}
            active={currentLesson.id == lesson.id}
          >
            <p>
              {lesson.title} [{lesson.orderIndex}]
            </p>
          </ListRow>
        ))}
        <ListRow alignment="center" fill={true} py="py-2">
          <p className="text-center text-xl font-bold">+</p>
        </ListRow>
      </ListContainer>
    </div>
  );
}
