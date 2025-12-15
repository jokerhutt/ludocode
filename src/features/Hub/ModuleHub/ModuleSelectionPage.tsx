import { Button } from "@/components/external/ui/button";
import type { LudoCourse } from "@/types/Catalog/LudoCourse";
import type { LudoModule } from "@/types/Catalog/LudoModule";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { ModulesList } from "./Selection/ModulesList";
import { useRouter } from "@tanstack/react-router";

type ModuleSelectionPageProps = {
  currentCourse?: LudoCourse;
  modules: LudoModule[];
};

export function ModuleSelectionPage({
  currentCourse,
  modules,
}: ModuleSelectionPageProps) {
  const router = useRouter();
  return (
    <div className="col-start-2 col-end-12 overflow-auto lg:col-start-6 lg:col-end-8 flex flex-col gap-10 lg:gap-8 items-center py-6 min-w-0">
      <div className="flex flex-col w-full items-start justify-center gap-4">
        <h1 className="text-white text-lg">
          {currentCourse?.title ?? "No Course"}
        </h1>
        <Button
          onClick={() => router.navigate(ludoNavigation.courseRoot())}
          className="h-8"
        >
          Switch Course
        </Button>
      </div>
      <div className="flex flex-col w-full items-start justify-center gap-4">
        <h1 className="text-white text-lg">Course Modules</h1>
        <ModulesList rowClassName="rounded-t-lg" modules={modules} />
      </div>
    </div>
  );
}
