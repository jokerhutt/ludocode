import { ModuleAsideRight } from "./Aside/ModuleAsideRight";
import { ModulePathButton } from "./Path/ModulePathButton";
import type { LudoLesson } from "@/Types/Catalog/LudoLesson";
import type { CourseProgress } from "@/Types/Progress/CourseProgress";
import type { LudoModule } from "@/Types/Catalog/LudoModule";
import type { LudoCourse } from "@/Types/Catalog/LudoCourse";
import { ModuleAsideLeft } from "./Aside/ModuleAsideLeft";
import { PathRow } from "@/components/LudoComponents/Atoms/Row/PathRow";

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
