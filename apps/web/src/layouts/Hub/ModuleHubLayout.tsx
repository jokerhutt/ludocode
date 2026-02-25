import { useTreeData } from "@/features/Hub/ModuleHub/Hooks/useTreeData.tsx";
import { ModulePage } from "@/features/Hub/ModuleHub/Pages/ModulePage.tsx";
import { MobileModuleSlideOver } from "@/features/Hub/ModuleHub/Components/Navigator/MobileModuleSlideOver";
import type { LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import { getRouteApi } from "@tanstack/react-router";

export function ModuleHubLayout() {
  const moduleHubRoute = getRouteApi("/_app/_hub/learn/$courseId/$moduleId");
  const { courseId, moduleId } = moduleHubRoute.useParams();
  const { tree, allCourses } = moduleHubRoute.useLoaderData();

  const { modules, lessons, moduleProgress } = useTreeData({
    tree,
    courseId,
    moduleId,
  });

  const currentCourse = allCourses.find(
    (course: LudoCourse) => course.id == courseId,
  );

  return (
    <div className="layout-grid overflow-y-auto [scrollbar-gutter:stable] lg:grid-rows-1 grid-rows-[1fr] bg-ludo-background">
      <ModulePage
        lessons={lessons}
        course={currentCourse}
        modules={modules}
        moduleProgress={moduleProgress}
      />
      <MobileModuleSlideOver
        modules={modules}
        courseId={courseId}
        courseName={currentCourse?.title ?? ""}
        moduleProgress={moduleProgress}
      />
    </div>
  );
}
