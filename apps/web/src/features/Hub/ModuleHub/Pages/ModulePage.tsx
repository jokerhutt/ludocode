import { ModuleAsideRight } from "@/features/Hub/ModuleHub/Components/Aside/ModuleAsideRight.tsx";
import type { LudoLesson } from "@ludocode/types/Catalog/LudoLesson.ts";
import type { LudoModule } from "@ludocode/types/Catalog/LudoModule.ts";
import type { LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import { ModulePath } from "@/features/Hub/ModuleHub/Components/Path/Path.tsx";
import type { ModuleProgress } from "@/features/Hub/ModuleHub/Hooks/useTreeData.tsx";

type ModulePageProps = {
  lessons: LudoLesson[];
  modules: LudoModule[];
  course?: LudoCourse;
  moduleProgress: Map<string, ModuleProgress>;
};

export function ModulePage({
  lessons,
  modules,
  course,
  moduleProgress,
}: ModulePageProps) {
  if (!course) return null;

  const { id: courseId, title: courseTitle } = course;

  return (
    <>
      <div className="col-span-1" />
      <div className="col-span-10 py-6 gap-12 lg:gap-20 flex justify-center lg:justify-end">
        <div className="overflow-y-auto w-60 flex flex-col lg:gap-8 items-center lg:px-0 min-w-0">
          <ModulePath lessons={lessons} />
        </div>
        <div className="col-span-3 hidden lg:block w-80 min-w-72 max-w-80">
          <div className="sticky top-6">
            <ModuleAsideRight
              modules={modules}
              courseId={courseId}
              courseName={courseTitle}
              moduleProgress={moduleProgress}
            />
          </div>
        </div>
      </div>
      <div className="col-span-1" />
    </>
  );
}
