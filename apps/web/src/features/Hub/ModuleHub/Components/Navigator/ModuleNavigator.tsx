import type { LudoModule } from "@ludocode/types/Catalog/LudoModule.ts";
import type { ModuleProgress } from "@/features/Hub/ModuleHub/Hooks/useTreeData.tsx";
import { CourseCard } from "@/features/Hub/CourseHub/Components/Card/CourseCard";
import { ResetProgressButton } from "../Button/ResetProgressButton";
import { LudoList } from "@ludocode/design-system/widgets/LudoList";

type ModuleNavigatorProps = {
  modules: LudoModule[];
  currentModuleId: string;
  selectModule: (moduleId: string) => void;
  courseId: string;
  courseName: string;
  moduleProgress: Map<string, ModuleProgress>;
};

export function ModuleNavigator({
  modules,
  courseId,
  currentModuleId,
  selectModule,
  courseName,
  moduleProgress,
}: ModuleNavigatorProps) {
  return (
    <LudoList>
      <CourseCard courseId={courseId} title={courseName} />

      <div>
        <LudoList.Header>Modules</LudoList.Header>
        <LudoList.Content>
          {modules.map((module) => {
            const isActive = currentModuleId === module.id;
            const progress = moduleProgress.get(module.id);
            const isComplete =
              progress != null &&
              progress.total > 0 &&
              progress.completed === progress.total;

            return (
              <LudoList.Item
                title={module.title}
                position={module.orderIndex}
                isComplete={isComplete}
                progress={{
                  current: progress?.completed ?? 0,
                  total: progress?.total ?? 0,
                  detailed: true,
                }}
                isActive={isActive}
                onClick={() => selectModule(module.id)}
              />
            );
          })}
        </LudoList.Content>
      </div>

      <div className="pt-2">
        <ResetProgressButton courseId={courseId} />
      </div>
    </LudoList>
  );
}
