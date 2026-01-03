import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import type { LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import type { LudoModule } from "@ludocode/types/Catalog/LudoModule.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { ModulesList } from "@/features/Hub/ModuleHub/Components/Selection/ModulesList.tsx";
import { router } from "@/main.tsx";

type ModuleSelectionPageProps = {
  currentCourse?: LudoCourse;
  modules: LudoModule[];
};

export function ModuleSelectionPage({
  currentCourse,
  modules,
}: ModuleSelectionPageProps) {
  return (
    <div className="col-start-2 col-end-12 overflow-auto lg:col-start-6 lg:col-end-8 flex flex-col gap-10 lg:gap-8 items-center py-6 min-w-0">
      <div className="flex flex-col w-full items-start justify-center gap-4">
        <h1 className="text-white text-lg">
          {currentCourse?.title ?? "No Course"}
        </h1>
        <LudoButton
          variant="alt"
          onClick={() => router.navigate(ludoNavigation.courseRoot())}
          className="h-8 w-1/2"
        >
          Switch Course
        </LudoButton>
      </div>
      <div className="flex flex-col w-full items-start justify-center gap-4">
        <h1 className="text-white text-lg">Course Modules</h1>
        <ModulesList rowClassName="rounded-t-lg" modules={modules} />
      </div>
    </div>
  );
}
