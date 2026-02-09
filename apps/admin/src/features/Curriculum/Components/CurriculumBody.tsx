import { useState } from "react";
import { CurriculumPreview } from "./CurriculumPreview";
import { LessonPreview } from "./LessonPreview";
import type { CourseSnap, LessonSnap } from "@ludocode/types";

type CurriculumBodyProps = { courseSnap: CourseSnap };

export function CurriculumBody({ courseSnap }: CurriculumBodyProps) {
  const [selectedLesson, setSelectedLesson] = useState<LessonSnap | null>(null);

  return (
    <div className="flex gap-4 min-h-0">
      <div className="w-full  flex flex-col h-full">
        <CurriculumPreview
          selectedLesson={selectedLesson}
          onLessonClick={setSelectedLesson}
          modules={courseSnap.modules}
        />
      </div>

      <div className="w-1/2 flex min-h-0 flex-col h-full">
        {selectedLesson && <LessonPreview lesson={selectedLesson} />}
      </div>
    </div>
  );
}
