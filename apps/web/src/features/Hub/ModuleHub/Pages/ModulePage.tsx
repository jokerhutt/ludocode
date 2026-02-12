import { ModuleAsideRight } from "@/features/Hub/ModuleHub/Components/Aside/ModuleAsideRight.tsx";
import type { LudoLesson } from "@ludocode/types/Catalog/LudoLesson.ts";
import type { CourseProgress } from "@ludocode/types/User/CourseProgress.ts";
import type { LudoModule } from "@ludocode/types/Catalog/LudoModule.ts";
import type { LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import { ModuleAsideLeft } from "@/features/Hub/ModuleHub/Components/Aside/ModuleAsideLeft.tsx";
import { ModulePath } from "@/features/Hub/ModuleHub/Components/Path/Path.tsx";

type ModulePageProps = {
  lessons: LudoLesson[];
  modules: LudoModule[];
  course?: LudoCourse;
};

export function ModulePage({
  lessons,
  modules,
  course,
}: ModulePageProps) {
  if (!course) return null;

  const { id: courseId, title: courseTitle } = course;

  return (
    <>
      <ModuleAsideLeft />
      <div className="main-col-thin overflow-auto flex flex-col lg:gap-8 items-center px-8 lg:px-0 p-6 min-w-0">
        <ModulePath
          lessons={lessons}
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
