import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@ludocode/external/ui/drawer";
import { SubscriptionBadge } from "@/features/Hub/Components/Zone/SubscriptionBadge.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { router } from "@/main";
import {
  LifeBuoy,
  LockIcon,
  Map,
  NotebookText,
  Scroll,
  Settings,
  User,
  X,
} from "lucide-react";
import type { ReactElement } from "react";
import type { LudoUser, SubscriptionPlan } from "@ludocode/types";
import { LogoutButton } from "@/features/Auth/Components/Button/LogoutButton";
import { DeleteAccountButton } from "@/features/Auth/Components/Button/DeleteAccountButton";
import { useFeatureEnabledCheck } from "@/hooks/Guard/useFeatureEnabledCheck";

type ProfileDrawerProps = {
  trigger: ReactElement;
  user: LudoUser;
  plan: SubscriptionPlan;
};

export function ProfileDrawer({ trigger, user, plan }: ProfileDrawerProps) {
  const demoFeature = useFeatureEnabledCheck({ feature: "isDemoEnabled" });

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>

      <DrawerContent className="w-full lg:w-1/3 lg:max-w-md sm:max-w-full rounded-none border-l flex flex-col border-ludo-border bg-ludo-background">
        <DrawerHeader className="relative border-b border-ludo-border px-6 py-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-base flex items-center gap-2 font-semibold text-white">
              Account
              <SubscriptionBadge className="mt-1" tier={plan} />
            </DrawerTitle>
            <DrawerClose asChild>
              <button
                type="button"
                aria-label="Close"
                className="rounded-md p-1 hover:bg-ludo-surface transition-colors"
              >
                <X className="h-4 w-4 text-ludoAltText" />
              </button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <nav className="flex-1 overflow-y-auto flex flex-col gap-1 p-4">
          <DrawerClose asChild>
            <NavItem
              icon={<User className="h-5 w-5" />}
              label="Profile"
              onClick={() =>
                router.navigate(ludoNavigation.hub.profile.toProfile(user.id))
              }
            />
          </DrawerClose>
          <DrawerClose asChild>
            <NavItem
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              onClick={() =>
                router.navigate(ludoNavigation.hub.profile.toSettings(user.id))
              }
            />
          </DrawerClose>
          <DrawerClose asChild>
            <NavItem
              icon={<LifeBuoy className="h-5 w-5" />}
              label="Support"
              onClick={() =>
                router.navigate(ludoNavigation.hub.profile.toSettings(user.id))
              }
            />
          </DrawerClose>
          <DrawerClose asChild>
            <NavItem
              icon={<NotebookText className="h-5 w-5" />}
              label="Documentation"
              onClick={() =>
                router.navigate(ludoNavigation.hub.profile.toSettings(user.id))
              }
            />
          </DrawerClose>
          <DrawerClose asChild>
            <NavItem
              icon={<Map className="h-5 w-5" />}
              label="Roadmap"
              onClick={() =>
                router.navigate(ludoNavigation.hub.profile.toSettings(user.id))
              }
            />
          </DrawerClose>
          <DrawerClose asChild>
            <NavItem
              icon={<LockIcon className="h-5 w-5" />}
              label="Privacy Policy"
              onClick={() =>
                router.navigate(ludoNavigation.resources.toPrivacy())
              }
            />
          </DrawerClose>
          <DrawerClose asChild>
            <NavItem
              icon={<Scroll className="h-5 w-5" />}
              label="Terms of service"
              onClick={() => router.navigate(ludoNavigation.resources.toToS())}
            />
          </DrawerClose>
        </nav>

        {!demoFeature.enabled && (
          <div className="border-t border-ludo-border p-4 flex justify-between items-center gap-2">
            <LogoutButton />
            <DeleteAccountButton username={user.displayName!!} />
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}

function NavItem({
  icon,
  label,
  onClick,
}: {
  icon: ReactElement;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-ludoAltText transition-colors hover:cursor-pointer hover:bg-ludo-surface"
    >
      <span className="flex items-center justify-center text-ludo-muted">
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}
