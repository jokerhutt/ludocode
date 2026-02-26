import { ludoNavigation } from "@/constants/ludoNavigation";
import { router } from "@/main";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";

type AccountActionsGroupProps = { userId: string };

export function AccountActionsGroup({ userId }: AccountActionsGroupProps) {
  return (
    <div className="w-full flex gap-2 lg:gap-4 justify-center mb-6">
      <LudoButton
        onClick={() =>
          router.navigate(ludoNavigation.hub.profile.toSettings(userId))
        }
        variant="alt"
        shadow={false}
        className="text-sm px-6 rounded-full"
      >
        Account Settings
      </LudoButton>
    </div>
  );
}
