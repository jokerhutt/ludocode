import type {
  CurriculumDraftLesson,
  CurriculumDraftLessons,
} from "@ludocode/types";
import { LessonPreviewItem } from "./LessonPreviewItem";

type ModulePreviewItemProps = {
  title: string;
  lessons: CurriculumDraftLessons;
  onLessonClick: (lesson: CurriculumDraftLesson) => void;
  onLessonNavigate?: (lesson: CurriculumDraftLesson) => void;
  selectedLesson: CurriculumDraftLesson | null;
};

export function ModulePreviewItem({
  title,
  lessons,
  onLessonClick,
  onLessonNavigate,
  selectedLesson,
}: ModulePreviewItemProps) {
  return (
    <div className="flex flex-col">
      <p>{title}</p>
      <div className="w-full flex flex-col gap-2 p-4">
        {lessons.map((lesson) => (
          <LessonPreviewItem
            key={lesson.id}
            isSelected={selectedLesson?.id == lesson.id}
            onClick={() => onLessonClick(lesson)}
            onNavigate={
              onLessonNavigate ? () => onLessonNavigate(lesson) : undefined
            }
            title={lesson.title}
          />
        ))}
      </div>
    </div>
  );
}
