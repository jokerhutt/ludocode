import { useTreeData } from "@/features/Hub/ModuleHub/Hooks/useTreeData.tsx";
import {
  ModuleSelectionTabs,
  type MobileModuleTabs,
} from "@/features/Hub/ModuleHub/Components/Selection/ModuleSelectionTabs.tsx";
import { useEffect } from "react";
import { ModulePage } from "@/features/Hub/ModuleHub/Pages/ModulePage.tsx";
import { ModuleSelectionPage } from "@/features/Hub/ModuleHub/Pages/ModuleSelectionPage.tsx";
import type { LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import { getRouteApi } from "@tanstack/react-router";
import { useTab } from "@ludocode/hooks";

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

  const mainTab: MobileModuleTabs = "Path";
  const { activeTab, setTab } = useTab<MobileModuleTabs>(mainTab);
  useEffect(() => {
    if (activeTab != mainTab) setTab(mainTab);
  }, [moduleId]);

  return (
    <div className="layout-grid lg:grid-rows-1 grid-rows-[auto_1fr] bg-ludo-background">
      <ModuleSelectionTabs
        activeTab={activeTab}
        changeTab={setTab}
        className="lg:hidden col-span-full"
      />
      {activeTab == mainTab ? (
        <ModulePage
          lessons={lessons}
          course={currentCourse}
          modules={modules}
          moduleProgress={moduleProgress}
        />
      ) : (
        <ModuleSelectionPage modules={modules} currentCourse={currentCourse} />
      )}
    </div>
  );
}
