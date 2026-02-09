import type { LessonSnap } from "@ludocode/types";
import { CurriculumLessonPreviewItem } from "./CurriculumLessonPreviewItem";

type CurriculumModuleListProps = {
  title: string;
  lessons: LessonSnap[];
  onLessonClick: (lesson: LessonSnap) => void;
  selectedLesson: LessonSnap | null;
};

export function CurriculumModuleList({
  title,
  lessons,
  onLessonClick,
  selectedLesson,
}: CurriculumModuleListProps) {
  return (
    <div className="flex flex-col">
      <p>{title}</p>
      <div className="w-full flex flex-col gap-2 p-4">
        {lessons.map((lesson) => (
          <CurriculumLessonPreviewItem
            isSelected={selectedLesson?.id == lesson.id}
            onClick={() => onLessonClick(lesson)}
            title={lesson.title}
          />
        ))}
      </div>
    </div>
  );
}
