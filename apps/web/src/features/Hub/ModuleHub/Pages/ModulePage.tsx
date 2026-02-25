import type { LudoLesson } from "@ludocode/types/Catalog/LudoLesson.ts";
import type { LudoModule } from "@ludocode/types/Catalog/LudoModule.ts";
import type { LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import type { ModuleProgress } from "@/features/Hub/ModuleHub/Hooks/useTreeData.tsx";
import { ModuleNavigator } from "../Components/Navigator/ModuleNavigator";

import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { ModulePath } from "../Components/Path/ModulePath";

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

  const routeApi = getRouteApi("/_app/_hub/learn/$courseId/$moduleId");
  const router = useRouter();
  const { moduleId } = routeApi.useParams();

  const selectModule = (selectedModuleId: string) => {
    if (moduleId === selectedModuleId) return;
    router.navigate(
      ludoNavigation.hub.module.toModule(courseId, selectedModuleId),
    );
  };

  const currentLessonId = lessons.find((l) => !l.isCompleted)?.id;

  return (
    <>
      <aside className="col-span-1" />
      <div className="col-span-10 py-6 gap-12 lg:gap-20 flex justify-center lg:justify-end">
        <div className="w-60 flex flex-col lg:gap-8 items-center lg:px-0 min-w-0">
          <ModulePath
            lessons={lessons}
            currentLessonId={currentLessonId}
            courseId={courseId}
            moduleId={moduleId}
          />
        </div>
        <div className="col-span-3 hidden lg:block w-80 min-w-72 max-w-80">
          <div className="sticky top-6">
            <ModuleNavigator
              currentModuleId={moduleId}
              selectModule={selectModule}
              modules={modules}
              courseId={courseId}
              courseName={courseTitle}
              moduleProgress={moduleProgress}
            />
          </div>
        </div>
      </div>
      <aside className="col-span-1" />
    </>
  );
}
