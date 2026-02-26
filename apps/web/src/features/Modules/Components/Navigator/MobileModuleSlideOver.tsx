import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import type { LudoModule } from "@ludocode/types/Catalog/LudoModule.ts";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import type { ModuleProgress } from "@/features/Modules/Hooks/useTreeData";
import { useState } from "react";
import { LudoList } from "@ludocode/design-system/widgets/LudoList";
import { FloatingTriggerButton } from "../Path/FloatingTriggerButton";
import { LudoSlideOver } from "@ludocode/design-system/widgets/LudoSlideOver";
type MobileModuleSlideOverProps = {
  modules: LudoModule[];
  courseId: string;
  courseName: string;
  moduleProgress: Map<string, ModuleProgress>;
};

export function MobileModuleSlideOver({
  modules,
  courseId,
  courseName,
  moduleProgress,
}: MobileModuleSlideOverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const routeApi = getRouteApi("/_app/_hub/learn/$courseId/$moduleId");
  const router = useRouter();
  const { moduleId } = routeApi.useParams();

  const currentModule = modules.find((m) => m.id === moduleId);

  const selectModule = (selectedModuleId: string) => {
    if (moduleId === selectedModuleId) {
      setIsOpen(false);
      return;
    }
    router.navigate(
      ludoNavigation.hub.module.toModule(courseId, selectedModuleId),
    );
    setIsOpen(false);
  };

  return (
    <>
      <FloatingTriggerButton
        onClick={() => setIsOpen(true)}
        chevron
        position={currentModule?.orderIndex}
        title={currentModule?.title ?? "Modules"}
      />
      <LudoSlideOver open={isOpen} onOpenChange={setIsOpen} side="bottom">
        <LudoSlideOver.Header onClose={() => setIsOpen(false)}>
          <div>
            <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest">
              {courseName}
            </p>
            <p className="text-white text-base font-bold">Select Module</p>
          </div>
        </LudoSlideOver.Header>

        <LudoSlideOver.Content>
          <LudoList>
            <LudoList.Content>
              {modules.map((module) => {
                const isActive = moduleId === module.id;
                const progress = moduleProgress.get(module.id);
                const isComplete =
                  progress != null &&
                  progress.total > 0 &&
                  progress.completed === progress.total;
                return (
                  <LudoList.Item
                    isActive={isActive}
                    progress={{
                      total: progress?.total ?? 0,
                      current: progress?.completed ?? 0,
                      detailed: true,
                    }}
                    onClick={() => selectModule(module.id)}
                    position={module.orderIndex}
                    title={module.title}
                    isComplete={isComplete}
                  />
                );
              })}
            </LudoList.Content>
          </LudoList>
        </LudoSlideOver.Content>
      </LudoSlideOver>
    </>
  );
}
