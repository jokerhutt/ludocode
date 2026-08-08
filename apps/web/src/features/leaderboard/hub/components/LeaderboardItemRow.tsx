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
  const isPodium = position <= 3;

  return (
    <div
      className={cn(
        "grid h-16 w-full shrink-0 grid-cols-[2rem_2.5rem_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-4",
        isUser
          ? "border-ludo-accent-muted/50 bg-ludo-surface"
          : "border-ludo-border bg-ludo-surface-dim",
      )}
    >
      <span
        className={cn(
          "text-sm font-bold tabular-nums",
          isPodium ? "text-ludo-accent-muted" : "text-ludo-white-dim",
        )}
      >
        {position}
      </span>
      <Avatar className="h-10 w-10 border-2 lg:h-10 lg:w-10" src={avatarSrc} />
      <p className="min-w-0 truncate text-sm text-ludo-white-bright lg:text-base">
        {username}
      </p>
      <p className="flex items-baseline gap-1 text-right">
        <span className="text-sm font-bold tabular-nums text-ludo-white-bright lg:text-base">
          {points}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-ludo-white-dim">
          xp
        </span>
      </p>
    </div>
  );
}
