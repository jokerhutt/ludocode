import { getUserAvatar } from "@/constants/avatars/avatars.ts";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { router } from "@/main";
import { Avatar } from "@ludocode/design-system/primitives/avatar.tsx";
import type { LudoUser } from "@ludocode/types";
import { parseToDate } from "@ludocode/util";
import { Pencil } from "lucide-react";

type UserCardProps = {
  user: LudoUser;
  showAvatar?: boolean;
  editable?: boolean;
  showUsername?: boolean;
  showJoinDate?: boolean;
};

export function UserCard({
  user,
  editable,
  showAvatar = true,
  showJoinDate = true,
  showUsername = true,
}: UserCardProps) {
  const { displayName, createdAt, avatarVersion, avatarIndex } = user;
  const joinTime = parseToDate(createdAt);

  const userPfpSrc = getUserAvatar(avatarVersion, avatarIndex);

  return (
    <div className="flex flex-col items-center gap-3 lg:gap-4 lg:w-full pb-6 px-4 rounded-xl">
      {showAvatar && (
        <div className="relative">
          {editable && (
            <button
              onClick={() =>
                router.navigate(ludoNavigation.hub.profile.toAvatar(user.id))
              }
              className="absolute hover:bg-ludo-white-bright hover:text-black hover:cursor-pointer z-10 bottom-0 rounded-md flex justify-center items-center right-0 h-8 w-8 bg-ludo-accent"
            >
              <Pencil className="h-4 w-4" />
            </button>
          )}
          <div className="absolute -inset-1.5 rounded-full bg-ludo-surface-hover blur-md" />
          <Avatar className="h-24 w-24 relative" src={userPfpSrc} />
        </div>
      )}
      <div className="flex flex-col gap-0.5 items-center">
        {showUsername && (
          <h2 className="text-2xl font-semibold tracking-tight">
            {displayName}
          </h2>
        )}
        {showJoinDate && (
          <p className="text-sm text-ludo-white/60">Joined {joinTime}</p>
        )}
      </div>
    </div>
  );
}
