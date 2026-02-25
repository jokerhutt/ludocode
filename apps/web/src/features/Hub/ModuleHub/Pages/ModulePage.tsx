import { ModuleAsideRight } from "@/features/Hub/ModuleHub/Components/Aside/ModuleAsideRight.tsx";
import type { LudoLesson } from "@ludocode/types/Catalog/LudoLesson.ts";
import type { LudoModule } from "@ludocode/types/Catalog/LudoModule.ts";
import type { LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import { ModuleAsideLeft } from "@/features/Hub/ModuleHub/Components/Aside/ModuleAsideLeft.tsx";
import { ModulePath } from "@/features/Hub/ModuleHub/Components/Path/Path.tsx";

type ModulePageProps = {
  lessons: LudoLesson[];
  modules: LudoModule[];
  course?: LudoCourse;
};

export function ModulePage({ lessons, modules, course }: ModulePageProps) {
  if (!course) return null;

  const { id: courseId, title: courseTitle } = course;

  return (
    <>
      <div className="col-span-1" />
      <div className="col-span-10 gap-10 flex justify-end">
        <div className="overflow-y-auto w-auto flex flex-col lg:gap-8 items-center px-5 lg:px-0 min-w-0">
          <ModulePath lessons={lessons} />
        </div>
        <div className="col-span-3 min-w-80">
          <ModuleAsideRight
            modules={modules}
            courseId={courseId}
            courseName={courseTitle}
          />
        </div>
      </div>

      <div className="col-span-1" />
    </>
  );
}
