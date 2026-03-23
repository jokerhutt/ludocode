import { Progress } from "@ludocode/external/ui/progress.tsx";
import { LeaveUnsavedDialog } from "@ludocode/design-system/templates/dialog/leave-unsaved-dialog.tsx";
import { IconButton } from "@ludocode/design-system/primitives/icon-button.tsx";
import { LudoHeader } from "@ludocode/design-system/zones/ludo-header.tsx";
import { LessonMenu } from "./LessonMenu";
import { LessonDiscussionDrawer } from "./LessonDiscussionDrawer";
import { LessonAiDrawer } from "./LessonAiDrawer";
import { LessonChatTabsRail } from "./LessonChatTabsRail";
import { useState } from "react";
import { useLessonExercise } from "@/features/lesson/context/useLessonContext.tsx";
import { useIsMobile } from "@ludocode/hooks";
import { Settings } from "lucide-react";
import { LessonActionsDesktop } from "./LessonActions";

type LessonHeaderProps = {
  total: number;
  position: number;
  onExit?: () => void;
};

export function LessonHeader({ total, onExit, position }: LessonHeaderProps) {
  const isMobile = useIsMobile({});
  const { currentExercise } = useLessonExercise();
  const isGuidedLesson = currentExercise.interaction?.type === "EXECUTABLE";
  const [activePanel, setActivePanel] = useState<"DISCUSSION" | "AI" | null>(
    null,
  );
  const [panelAnimated, setPanelAnimated] = useState(true);
  const completed = position + 1;

  const handlePanelToggle = (target: "DISCUSSION" | "AI") => {
    if (activePanel === target) {
      setPanelAnimated(true);
      setActivePanel(null);
      return;
    }

    setPanelAnimated(activePanel === null);
    setActivePanel(target);
  };

  const handleDiscussToggle = () => handlePanelToggle("DISCUSSION");
  const handleAiToggle = () => handlePanelToggle("AI");

  return (
    <>
      <LudoHeader.Shell className="px-6 lg:border-b-0" device="Both">
        <div className=" col-span-2 lg:col-span-3 flex items-center h-full">
          {onExit && (
            <LeaveUnsavedDialog
              title="Are you sure you want to exit?"
              subtitle="All unsaved progress will be lost"
              buttonText="Quit"
              onClick={() => onExit()}
            >
              <IconButton variant="large" iconName="XMarkIcon" />
            </LeaveUnsavedDialog>
          )}
        </div>
        <div className="flex items-center justify-center col-span-8 lg:col-span-6">
          <Progress
            className="border-ludo-accent-muted h-3"
            value={(completed / total) * 100}
          />
        </div>
        <div className="col-span-2 lg:col-span-3 flex items-center justify-end gap-3">
          {isMobile ? (
            <LessonMenu
              trigger={<Settings className="text-ludo-white h-5" />}
              onDiscussSelect={isGuidedLesson ? undefined : handleDiscussToggle}
              onAiSelect={isGuidedLesson ? undefined : handleAiToggle}
              hideChat={isGuidedLesson}
            />
          ) : (
            <LessonActionsDesktop />
          )}
        </div>
      </LudoHeader.Shell>

      {!isGuidedLesson && (
        <>
          <LessonChatTabsRail
            activePanel={activePanel}
            onDiscussToggle={handleDiscussToggle}
            onAiToggle={handleAiToggle}
          />

          <LessonDiscussionDrawer
            open={activePanel === "DISCUSSION"}
            animated={panelAnimated}
            onOpenChange={(next) => {
              setPanelAnimated(true);
              setActivePanel(next ? "DISCUSSION" : null);
            }}
          />
          <LessonAiDrawer
            open={activePanel === "AI"}
            animated={panelAnimated}
            onOpenChange={(next) => {
              setPanelAnimated(true);
              setActivePanel(next ? "AI" : null);
            }}
          />
        </>
      )}
    </>
  );
}
