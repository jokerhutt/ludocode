import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { ReactNode } from "react";

type LudoSidebarProps = { title: string; children: ReactNode };

export function LudoSidebar({ title, children }: LudoSidebarProps) {
  return (
    <Sidebar
      collapsible="icon"
      className="border-r-ludoLightPurple"
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
            {title}
          </SidebarGroupLabel>

          <SidebarGroupContent className="text-white pl-2 py-4 group-data-[collapsible=icon]:opacity-0 transition-[margin,opacity] duration-200 ease-linear">
            {children}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
