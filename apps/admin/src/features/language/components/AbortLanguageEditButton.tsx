import { adminNavigation } from "@/constants/adminNavigation.tsx";
import { router } from "@/main.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";

type AbortLanguageEditButtonProps = {};

export function AbortLanguageEditButton({}: AbortLanguageEditButtonProps) {
  return (
    <LudoButton
      onClick={() =>
        router.navigate(adminNavigation.hub.languages.toLanguagesHub())
      }
      variant={"white"}
      className="w-full"
    >
      Abort
    </LudoButton>
  );
}
