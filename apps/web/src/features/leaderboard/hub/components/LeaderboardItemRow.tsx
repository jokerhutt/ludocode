import { getUserAvatar } from "@/constants/avatars/avatars";
import { cn } from "@ludocode/design-system/cn-utils";
import { Avatar } from "@ludocode/design-system/primitives/avatar";
import type { LudoUser } from "@ludocode/types";

type LeaderboardItemRowProps = {
  position: number;
  username: string;
  avatar: string;
  points: number;
  isUser: boolean;
};

export function LeaderboardItemRow({
  position,
  username,
  avatar,
  points,
  isUser,
}: LeaderboardItemRowProps) {
  const avatarSrc = getUserAvatar("v1", 1);

  return (
    <div
      className={cn(
        "w-full text-lg text-ludo-white h-16 py-1 px-4 rounded-xl border border-ludo-border items-center grid grid-cols-[0.5fr_0.75fr_3fr_1fr]",
        isUser && "bg-ludo-surface-hover",
      )}
    >
      <p>{position}</p>
      <Avatar className="h-10 w-10" src={avatarSrc} />
      <p>{username}</p>
      <p className="text-right">{points}</p>
    </div>
  );
}
