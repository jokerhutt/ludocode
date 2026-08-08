import type { LudoLesson } from "@ludocode/types/Catalog/LudoLesson.ts";
import type { LudoModule } from "@ludocode/types/Catalog/LudoModule.ts";
import type { LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import type { ModuleProgress } from "@/features/modules/hooks/useTreeData.tsx";
import { ModuleNavigator } from "./navigator/ModuleNavigator.tsx";

import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { ModulePath } from "./path/ModulePath.tsx";
import { ModulePathHeader } from "./path/ModulePathHeader.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";

type ModulePageProps = {
  lessons: LudoLesson[];
  modules: LudoModule[];
  course?: LudoCourse;
  moduleProgress: Map<string, ModuleProgress>;
  className?: string;
};

export function ModulePage({
  lessons,
  modules,
  course,
  moduleProgress,
  className,
}: ModulePageProps) {
  const routeApi = getRouteApi("/app/_hub/learn/$courseId/$moduleId");
  const router = useRouter();
  const { moduleId } = routeApi.useParams();

  if (!course) return null;

  const { id: courseId, title: courseTitle } = course;

  const selectModule = (selectedModuleId: string) => {
    if (moduleId === selectedModuleId) return;
    router.navigate(
      ludoNavigation.hub.module.toModule(courseId, selectedModuleId),
    );
  };

  const currentLessonId = lessons.find((l) => !l.isCompleted)?.id;

  const i = modules.findIndex((m) => m.id === moduleId);
  const nextModule = i >= 0 ? modules[i + 1] : undefined;
  const currentModule = i >= 0 ? modules[i] : undefined;
  const completedLessons = lessons.filter((l) => l.isCompleted).length;

  return (
    <div
      className={cn(
        "py-6 gap-12 lg:gap-20 2xl:gap-40 flex justify-center lg:justify-end",
        className,
      )}
    >
      <div className="w-72 lg:w-80 max-w-full flex flex-col gap-4 lg:gap-6 items-center lg:px-0 min-w-0">
        {currentModule && (
          <ModulePathHeader
            moduleTitle={currentModule.title}
            moduleIndex={i + 1}
            moduleCount={modules.length}
            completedLessons={completedLessons}
            totalLessons={lessons.length}
          />
        )}
        <ModulePath
          modulesLength={modules.length}
          lessons={lessons}
          nextModuleId={nextModule?.id}
          nextModuleTitle={nextModule?.title}
          currentLessonId={currentLessonId}
          courseId={courseId}
          moduleId={moduleId}
        />
      </div>
      <div className="hidden lg:block w-90  2xl:w-140 min-w-72 max-w-90 2xl:max-w-140">
        <div className="sticky pb-6 top-6">
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
  );
}
