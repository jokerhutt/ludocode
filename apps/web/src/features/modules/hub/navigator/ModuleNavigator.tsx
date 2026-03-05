import type { LudoModule } from "@ludocode/types/Catalog/LudoModule.ts";
import type { ModuleProgress } from "@/features/modules/hooks/useTreeData.tsx";
import { CourseCard } from "@/features/course/hub/components/CourseCard.tsx";
import { ResetProgressButton } from "./ResetProgressButton.tsx";
import { LudoList } from "@ludocode/design-system/widgets/ludo-list.tsx";

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
