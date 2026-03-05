import { getUserAvatar } from "@/constants/avatars/avatars";
import { Avatar } from "@ludocode/design-system/primitives/avatar";
import type { LudoUser } from "@ludocode/types";
import { parseToDate } from "@ludocode/util";

type UserCardProps = {
  user: LudoUser;
  showAvatar?: boolean;
  showUsername?: boolean;
  showJoinDate?: boolean;
};

export function UserCard({
  user,
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
