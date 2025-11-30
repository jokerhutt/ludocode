import { moduleRoute } from "../routes/router";
import { useTreeData } from "../Hooks/Logic/Catalog/useTreeData";
import {
  ModuleSelectionBar,
  type MobileModuleTabs,
} from "../features/Module/ModuleSelectionBar";
import { useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/Hooks/Queries/Definitions/queries";
import { ModulePage } from "@/features/Module/ModulePage";
import { ModuleSelectionPage } from "@/features/Module/ModuleSelectionPage";
import { useTab } from "@/Hooks/UI/useTab";

export function ModuleLayout() {
  const { courseId, moduleId } = moduleRoute.useParams();
  const { tree } = moduleRoute.useLoaderData();

  const { courseProgress, modules, lessons } = useTreeData({
    tree,
    courseId,
    moduleId,
  });

  const { data: courses } = useSuspenseQuery(qo.allCourses());
  const currentCourse = courses.find((course) => course.id == courseId);

  //These are only for mobile
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
