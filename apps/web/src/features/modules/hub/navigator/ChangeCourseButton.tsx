import { ludoNavigation } from "@/constants/ludoNavigation";
import { router } from "@/main";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { RefreshCcw } from "lucide-react";

type ChangeCourseButtonProps = {};

export function ChangeCourseButton({}: ChangeCourseButtonProps) {
  return (
    <LudoButton
      variant="default"
      className="w-full h-10 text-sm gap-2"
      onClick={() => router.navigate(ludoNavigation.courseRoot())}
    >
      <>
        <RefreshCcw className="w-3.5 h-3.5" />
        Change Course
      </>
    </LudoButton>
  );
}
