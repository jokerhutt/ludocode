import { ModuleNavigator } from "@/features/Hub/ModuleHub/Components/Navigator/ModuleNavigator.tsx";
import type { LudoModule } from "@ludocode/types";
import type { ModuleProgress } from "@/features/Hub/ModuleHub/Hooks/useTreeData.tsx";

type ModuleAsideRightProps = {
  modules: LudoModule[];
  courseId: string;
  courseName: string;
  moduleProgress: Map<string, ModuleProgress>;
};

export function ModuleAsideRight({
  modules,
  courseId,
  courseName,
  moduleProgress,
}: ModuleAsideRightProps) {
  return (
    <ModuleNavigator
      modules={modules}
      courseId={courseId}
      courseName={courseName}
      moduleProgress={moduleProgress}
    />
  );
}
