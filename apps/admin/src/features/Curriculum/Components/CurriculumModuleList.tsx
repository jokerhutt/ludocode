import { CurriculumLessonPreviewItem } from "./CurriculumLessonPreviewItem";

type CurriculumModuleListProps = {};

export function CurriculumModuleList({}: CurriculumModuleListProps) {
  return (
    <div className="flex flex-col">
      <p>Intro to Python</p>
      <div className="w-full flex flex-col gap-2 p-4">
        <CurriculumLessonPreviewItem />
        <CurriculumLessonPreviewItem />
        <CurriculumLessonPreviewItem />
      </div>
    </div>
  );
}
