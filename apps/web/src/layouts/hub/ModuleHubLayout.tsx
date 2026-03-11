import { useTreeData } from "@/features/modules/hooks/useTreeData";
import { ModulePage } from "@/features/modules/hub/ModulePage.tsx";
import { MobileModuleSlideOver } from "@/features/modules/hub/navigator/MobileModuleSlideOver.tsx";
import type { LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import { getRouteApi } from "@tanstack/react-router";

export function ModuleHubLayout() {
  const moduleHubRoute = getRouteApi("/app/_hub/learn/$courseId/$moduleId");
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
      <aside className="col-span-1" />
      <ModulePage
        className="col-span-10"
        lessons={lessons}
        course={currentCourse}
        modules={modules}
        moduleProgress={moduleProgress}
      />
      <aside className="col-span-1" />
      <MobileModuleSlideOver
        modules={modules}
        courseId={courseId}
        courseName={currentCourse?.title ?? ""}
        moduleProgress={moduleProgress}
      />
    </div>
  );
}
