import { FloatingMobileTrigger } from "@ludocode/design-system/primitives/FloatingMobileTrigger.tsx";
import { LudoSlideOver } from "@ludocode/design-system/widgets/ludo-slideover.tsx";
import { InfoIcon } from "lucide-react";
import { useState } from "react";
import { ModuleOverviewBody } from "./ModuleOverview.tsx";

type MobileModuleInfoProps = {
  moduleTitle: string;
  moduleIndex: number;
  moduleCount: number;
  description?: string | null;
  completedLessons: number;
  totalLessons: number;
};

export function MobileModuleInfo({
  moduleTitle,
  moduleIndex,
  moduleCount,
  description,
  completedLessons,
  totalLessons,
}: MobileModuleInfoProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!description) return null;

  return (
    <>
      <FloatingMobileTrigger
        side="left"
        variant="surface"
        icon={InfoIcon}
        label="About this module"
        onClick={() => setIsOpen(true)}
      />

      <LudoSlideOver open={isOpen} onOpenChange={setIsOpen} side="bottom">
        <LudoSlideOver.Header onClose={() => setIsOpen(false)}>
          <div>
            <p className="text-ludo-white-dim text-[10px] font-semibold uppercase tracking-widest">
              Module {moduleIndex} of {moduleCount}
            </p>
            <p className="text-ludo-white-bright text-base font-bold">
              {moduleTitle}
            </p>
          </div>
        </LudoSlideOver.Header>

        <LudoSlideOver.Content>
          <ModuleOverviewBody
            description={description}
            completedLessons={completedLessons}
            totalLessons={totalLessons}
          />
        </LudoSlideOver.Content>
      </LudoSlideOver>
    </>
  );
}
