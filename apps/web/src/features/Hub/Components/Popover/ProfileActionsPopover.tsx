import { ludoNavigation } from "@/constants/ludoNavigation";
import { router } from "@/main";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LudoPopover } from "@ludocode/design-system/widgets/ludo-popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { LifeBuoy, Settings, User, X, XSquareIcon } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

type ProfileActionsPopoverProps = { trigger: ReactElement; userId: string };

export function ProfileActionsPopover({
  trigger,
  userId,
}: ProfileActionsPopoverProps) {
  return (
    <LudoPopover className="min-w-0" trigger={trigger}>
      <div className="flex text-ludoAltText flex-col w-64">
        {/* Header */}
        <div className="flex items-center justify-between pl-4 pb-2">
          <span className="text-xs font-medium uppercase tracking-wide text-ludo-muted">
            Account
          </span>

          <PopoverClose asChild>
            <button
              type="button"
              aria-label="Close"
              className="rounded-md p-1 hover:bg-ludo-surface transition-colors"
            >
              <X className="h-4 w-4 text-ludo-muted" />
            </button>
          </PopoverClose>
        </div>

        <div className="flex flex-col">
          <ActionItem
            onClick={() =>
              router.navigate(ludoNavigation.hub.profile.toProfile(userId))
            }
            icon={<User />}
            label="Profile"
          />
          <ActionItem
            onClick={() =>
              router.navigate(ludoNavigation.hub.profile.toSettings(userId))
            }
            icon={<Settings />}
            label="Settings"
          />

          <div className="my-2 border-t border-ludo-border" />

          <ActionItem
            onClick={() =>
              router.navigate(ludoNavigation.hub.profile.toProfile(userId))
            }
            icon={<LifeBuoy />}
            label="Support"
          />
        </div>
      </div>
    </LudoPopover>
  );
}

function ActionItem({
  icon,
  label,
  onClick,
}: {
  icon: ReactElement;
  label: string;
  onClick: () => void;
}) {
  return (
    <PopoverClose asChild>
      <button
        onClick={() => onClick()}
        type="button"
        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-ludo-surface transition-colors text-sm text-ludoAltText"
      >
        <span className="flex items-center justify-center w-5 h-5 text-ludo-muted">
          {icon}
        </span>
        <span className="font-medium">{label}</span>
      </button>
    </PopoverClose>
  );
}
