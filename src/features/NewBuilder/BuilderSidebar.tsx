import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { CourseSnap } from "@/Types/Snapshot/SnapshotTypes";
import { ModuleNode } from "./ModuleNode";
import { courseFormOpts, withForm } from "@/form/formKit";
import { ModuleListForm } from "./Sidebar/ModuleListForm";
type BuilderSidebarProps = { courseSnapshot: CourseSnap };

export const BuilderSidebar = withForm({
  ...courseFormOpts,
  props: {
    currentModuleId: "" as string,
    currentLessonId: "" as string,
  },
  render: ({ form, currentLessonId, currentModuleId }) => {
    const courseId = form.state.values.courseId;
    const modules = form.state.values.modules;

    return (
      <Sidebar
        collapsible="icon"
        className="[--sidebar-width:36rem] border-r-ludoLightPurple"
      >
        <div className="w-full h-14 px-2 bg-ludoLightPurple flex items-center justify-start">
          <SidebarTrigger className=" hover:cursor-pointer text-black" />
        </div>
        <SidebarContent
          data-state="expanded"
          className="bg-ludoGrayLight p-2 text-white"
        >
          <SidebarGroup>
            <SidebarGroupLabel className="text-lg text-white">
              Python
            </SidebarGroupLabel>

            <SidebarGroupContent className="text-white pl-2 py-4 group-data-[collapsible=icon]:opacity-0 transition-[margin,opacity] duration-200 ease-linear">
              <ModuleListForm
                currentLessonId={currentLessonId}
                currentModuleId={currentModuleId}
                form={form}
                courseId={courseId}
              />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  },
});
