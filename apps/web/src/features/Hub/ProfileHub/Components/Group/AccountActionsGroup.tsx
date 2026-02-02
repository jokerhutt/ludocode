import { ludoNavigation } from "@/constants/ludoNavigation";
import { router } from "@/main";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";

type AccountActionsGroupProps = { userId: string };

export function AccountActionsGroup({ userId }: AccountActionsGroupProps) {
  return (
    <div className="w-full flex gap-2 lg:gap-4 justify-between mb-8 lg:justify-end">
      <LudoButton
        onClick={() =>
          router.navigate(ludoNavigation.hub.profile.toSettings(userId))
        }
        variant="alt"
        className="text-lg w-full px-4"
      >
        Account Settings
      </LudoButton>
    </div>
  );
}
