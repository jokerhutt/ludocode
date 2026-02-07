import { adminNavigation } from "@/constants/adminNavigation";
import { router } from "@/main";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";

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
