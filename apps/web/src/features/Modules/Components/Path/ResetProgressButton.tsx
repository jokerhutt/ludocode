import { useResetCourseProgress } from "@/hooks/Queries/Mutations/useResetCourseProgress";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { Spinner } from "@ludocode/external/ui/spinner";
import { RotateCcwIcon } from "lucide-react";

type ResetProgressButtonProps = {courseId: string};

export function ResetProgressButton({courseId}: ResetProgressButtonProps) {
  const resetMutation = useResetCourseProgress();
  const isResetting = resetMutation.isPending;

  const handleReset = () => {
    if (isResetting) return;
    resetMutation.mutate(courseId);
  };

  return (
    <LudoButton
      variant="default"
      disabled={isResetting}
      className="w-full h-10 text-sm gap-2"
      onClick={handleReset}
    
    >
      {isResetting ? (
        <Spinner className="text-ludo-accent-muted" />
      ) : (
        <>
          <RotateCcwIcon className="w-3.5 h-3.5" />
          Reset Progress
        </>
      )}
    </LudoButton>
  );
}
