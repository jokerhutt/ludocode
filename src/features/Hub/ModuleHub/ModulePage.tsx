import { ModuleAsideRight } from "./Aside/ModuleAsideRight";
import type { LudoLesson } from "@/types/Catalog/LudoLesson";
import type { CourseProgress } from "@/types/User/CourseProgress.ts";
import type { LudoModule } from "@/types/Catalog/LudoModule";
import type { LudoCourse } from "@/types/Catalog/LudoCourse";
import { ModuleAsideLeft } from "./Aside/ModuleAsideLeft";
import { ModulePath } from "@/components/design/module/ModulePath";

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
      <div className="col-start-4 col-end-10 overflow-auto lg:col-start-6 lg:col-end-8 flex flex-col lg:gap-8 items-center py-6 min-w-0">
        <ModulePath
          lessons={lessons}
          currentLessonId={courseProgress.currentLessonId}
        />
      </div>
      <ModuleAsideRight
        modules={modules}
        courseId={courseId}
        courseName={courseTitle}
      />
    </>
  );
}
