import { LeaveUnsavedDialogWithTrigger } from "@/components/Molecules/Dialog/LeaveUnsavedDialogWithTrigger";
import { Button } from "@/components/ui/button";
import { ludoNavigation } from "@/routes/ludoNavigation";
import { router } from "@/routes/router";

type LeaveUnsavedButtonProps = { variant: any; enabled: boolean };

export function LeaveUnsavedButton({
  variant,
  enabled,
}: LeaveUnsavedButtonProps) {
  if (!enabled) {
    return (
      <Button variant={variant} >
        Quit
      </Button>
    );
  }

  return (
    <LeaveUnsavedDialogWithTrigger
      onClick={() => router.navigate(ludoNavigation.build.toSelectCourse())}
    >
      <Button variant={variant}> Quit </Button>
    </LeaveUnsavedDialogWithTrigger>
  );
}
