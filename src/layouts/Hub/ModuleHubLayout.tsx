import { useTreeData } from "@/features/Hub/ModuleHub/Hooks/useTreeData.tsx";
import {
  ModuleSelectionBar,
  type MobileModuleTabs,
} from "../../features/Hub/ModuleHub/Selection/ModuleSelectionBar";
import { useEffect } from "react";
import { ModulePage } from "@/features/Hub/ModuleHub/ModulePage";
import { useTab } from "@/hooks/UI/useTab";
import { ModuleSelectionPage } from "@/features/Hub/ModuleHub/ModuleSelectionPage";
import type { LudoCourse } from "@/types/Catalog/LudoCourse";
import { getRouteApi } from "@tanstack/react-router";

export function ModuleHubLayout() {
  const moduleHubRoute = getRouteApi("/_app/_hub/learn/$courseId/$moduleId");
  const { courseId, moduleId } = moduleHubRoute.useParams();
  const { tree, allCourses } = moduleHubRoute.useLoaderData();

  const { courseProgress, modules, lessons } = useTreeData({
    tree,
    courseId,
    moduleId,
  });

  const currentCourse = allCourses.find(
    (course: LudoCourse) => course.id == courseId
  );

  const mainTab: MobileModuleTabs = "Path";
  const { activeTab, setTab } = useTab<MobileModuleTabs>(mainTab);
  useEffect(() => {
    if (activeTab != mainTab) setTab(mainTab);
  }, [moduleId]);

  return (
    <div className="grid grid-cols-12 lg:grid-rows-1 grid-rows-[auto_1fr] bg-ludoGrayDark">
      <ModuleSelectionBar
        activeTab={activeTab}
        changeTab={setTab}
        className="lg:hidden col-span-full"
      />
      {activeTab == mainTab ? (
        <ModulePage
          lessons={lessons}
          course={currentCourse}
          courseProgress={courseProgress}
          modules={modules}
        />
      ) : (
        <ModuleSelectionPage modules={modules} currentCourse={currentCourse} />
      )}
    </div>
  );
}
