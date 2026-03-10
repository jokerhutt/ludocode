import { ludoNavigation } from "@/constants/ludoNavigation";
import { router } from "@/main";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { Code, NotebookText } from "lucide-react";

export function AuthResourceActionsGroup() {
  return (
    <div className="flex gap-4 justify-between items-center w-full">
      <LudoButton
        onClick={() => router.navigate(ludoNavigation.resources.toDocs())}
        className="text-sm"
      >
        <NotebookText className="h-4 w-4" />
        Docs
      </LudoButton>
      <LudoButton
        onClick={() =>
          window.open("https://github.com/jokerhutt/ludocode", "_blank")
        }
        className="text-sm"
      >
        <Code className="h-4 w-4" />
        Source Code
      </LudoButton>
    </div>
  );
}
