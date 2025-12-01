import { ModuleAsideRight } from "./Aside/ModuleAsideRight";
import { ModulePathButton } from "./Path/ModulePathButton";
import type { LudoLesson } from "@/types/Catalog/LudoLesson";
import type { CourseProgress } from "@/types/User/CourseProgress.ts";
import type { LudoModule } from "@/types/Catalog/LudoModule";
import type { LudoCourse } from "@/types/Catalog/LudoCourse";
import { ModuleAsideLeft } from "./Aside/ModuleAsideLeft";
import { PathRow } from "@/components/design-system/atoms/row/path-row.tsx";

type ModulePageProps = {
  lessons: LudoLesson[];
  modules: LudoModule[];
  course?: LudoCourse;
  courseProgress: CourseProgress;
};

export function ModulePage({
  lessons,
  modules,
  course,
  courseProgress,
}: ModulePageProps) {
  if (!course) return null;

  const { id: courseId, title: courseTitle } = course;

  return (
    <>
      <ModuleAsideLeft />
      <div className="col-start-5 col-end-9 overflow-auto lg:col-start-6 lg:col-end-8 flex flex-col gap-10 lg:gap-8 items-center py-6 min-w-0">
        {lessons.map((lesson: LudoLesson, i: number) => (
          <PathRow key={lesson.id} index={i}>
            <ModulePathButton
              isCurrent={lesson.id == courseProgress.currentLessonId}
              lesson={lesson}
            />
          </PathRow>
        ))}
      </div>
      <ModuleAsideRight
        modules={modules}
        courseId={courseId}
        courseName={courseTitle}
      />
    </>
  );
}
