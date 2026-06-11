import { getUserAvatar } from "@/constants/avatars/avatars";
import { cn } from "@ludocode/design-system/cn-utils";
import { Avatar } from "@ludocode/design-system/primitives/avatar";

type LeaderboardItemRowProps = {
  position: number;
  username: string;
  avatarIndex: number;
  avatarVersion: string;
  points: number;
  isUser: boolean;
};

export function LeaderboardItemRow({
  position,
  username,
  avatarIndex,
  avatarVersion,
  points,
  isUser,
}: LeaderboardItemRowProps) {
  const avatarSrc = getUserAvatar(avatarVersion, avatarIndex);

  return (
    <div
      className={cn(
        "w-full text-lg text-ludo-white h-16 py-1 px-4 rounded-xl border border-ludo-border items-center grid grid-cols-[0.5fr_0.75fr_minmax(0,3fr)_1fr]",
        isUser && "bg-ludo-surface-hover",
      )}
    >
      <p>{position}</p>
      <Avatar className="h-10 w-10" src={avatarSrc} />
      <p className="min-w-0 truncate">{username}</p>
      <p className="text-right">{points}</p>
    </div>
  );
}
