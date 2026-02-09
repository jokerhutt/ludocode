import { useState } from "react";
import { CurriculumPreview } from "./CurriculumPreview";
import { LessonPreview } from "./LessonPreview";
import type { CourseSnap, CurriculumDraft, CurriculumDraftLesson, LessonSnap } from "@ludocode/types";
import { CurriculumEditor } from "./Editor/CurriculumEditor";

type CurriculumBodyProps = {
  curriculumSnap: CurriculumDraft;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
};

export function CurriculumBody({ curriculumSnap, isEditing, setIsEditing }: CurriculumBodyProps) {
  const [selectedLesson, setSelectedLesson] = useState<CurriculumDraftLesson | null>(null);

  return (
    <div className="flex gap-4 min-h-0">
      <div className="w-full flex flex-col h-full">
        {!isEditing ? (
          <CurriculumPreview
            selectedLesson={selectedLesson}
            onLessonClick={setSelectedLesson}
            modules={curriculumSnap.modules}
          />
        ) : (
          <CurriculumEditor />
        )}
      </div>

      <div className="w-1/2 flex min-h-0 flex-col h-full">
        {!isEditing && selectedLesson && (
          <LessonPreview lesson={selectedLesson} />
        )}
      </div>
    </div>
  );
}
