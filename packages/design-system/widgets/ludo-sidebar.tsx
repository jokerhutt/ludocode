import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
} from "@ludocode/external/ui/sidebar";
import type { ReactNode } from "react";

type LudoSidebarProps = { title: string; children: ReactNode };

export function LudoSidebar({ title, children }: LudoSidebarProps) {
  return (
    <Sidebar collapsible="icon" className="border-r-ludo-accent-muted">
      <div className="w-full h-14 px-2 bg-ludo-surface flex items-center justify-start">
        <SidebarTrigger className=" hover:cursor-pointer text-ludo-white-bright" />
      </div>
      <SidebarContent
        data-state="expanded"
        className="bg-ludo-background p-2 text-ludo-white-bright"
      >
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg text-ludo-white-bright">
            {title}
          </SidebarGroupLabel>

          <SidebarGroupContent className="text-ludo-white-bright pl-2 py-4 group-data-[collapsible=icon]:opacity-0 transition-[margin,opacity] duration-200 ease-linear">
            {children}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
