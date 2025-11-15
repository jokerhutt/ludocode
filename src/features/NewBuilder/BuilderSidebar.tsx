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
type BuilderSidebarProps = { courseSnapshot: CourseSnap };

export function BuilderSidebar({ courseSnapshot }: BuilderSidebarProps) {
  const modules = courseSnapshot.modules;

  return (
    <Sidebar collapsible="icon" className="[--sidebar-width:36rem] border-r-ludoLightPurple">
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
            <SidebarMenu>
              {modules.map((item) => (
                <ModuleNode moduleSnapshot={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
