import { CommonHeader } from "@/components/Molecules/Header/CommonHeader";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { qo } from "@/Hooks/Queries/Definitions/queries";
import { MainGridWrapper } from "@/Layouts/LayoutWrappers/MainGridWrapper";
import { buildRoute } from "@/routes/router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BuilderSidebar } from "./BuilderSidebar";

type NewBuilderLayoutProps = {};

export function NewBuilderLayout({}: NewBuilderLayoutProps) {
  const { courseId } = buildRoute.useParams();
  const { data: courseSnapshot } = useSuspenseQuery(
    qo.courseSnapshot(courseId)
  );

  return (
    <>
      <SidebarProvider>
        <BuilderSidebar courseSnapshot={courseSnapshot} />
        <div className="flex w-full bg-ludoGrayLight items-center gap-4 px-4 h-14">
          <p>Builder</p>
        </div>

        <MainGridWrapper gridRows="SITE">
          <div className="grid col-span-full h-full grid-cols-12 bg-ludoGrayDark"></div>
        </MainGridWrapper>
      </SidebarProvider>
    </>
  );
}
