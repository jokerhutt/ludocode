import { getUserAvatar } from "@/constants/avatars/avatars";
import { cn } from "@ludocode/design-system/cn-utils";
import { Avatar } from "@ludocode/design-system/primitives/avatar";
import type { LeaderboardUser } from "@ludocode/types";

type LeaderboardPodiumProps = {
  currentUserId: string;
  topUsers: (LeaderboardUser | undefined)[];
};

const podiumHeights = {
  1: "h-16 lg:h-24",
  2: "h-14 lg:h-20",
  3: "h-12 lg:h-16",
};

const podiumRankNumberSize = {
  1: "text-2xl lg:text-4xl",
  2: "text-xl lg:text-3xl",
  3: "text-lg lg:text-[1.75rem]",
};

export function LeaderboardPodium({
  currentUserId,
  topUsers,
}: LeaderboardPodiumProps) {
  return (
    <div className="flex w-full items-end gap-1.5 lg:gap-2">
      <PodiumPlayer currentUserId={currentUserId} user={topUsers[0]} rank={2} />
      <PodiumPlayer currentUserId={currentUserId} user={topUsers[1]} rank={1} />
      <PodiumPlayer currentUserId={currentUserId} user={topUsers[2]} rank={3} />
    </div>
  );
}

type PodiumPlayerProps = {
  currentUserId: string;
  user: LeaderboardUser | undefined;
  rank: 1 | 2 | 3;
};

function PodiumPlayer({ currentUserId, user, rank }: PodiumPlayerProps) {
  const avatarSrc = user?.avatarIndex
    ? getUserAvatar(user.avatarVersion, user.avatarIndex)
    : "/avatars/nouser.png";
  const displayName = user?.displayName ?? "Unclaimed";
  const points = user?.xp ? user.xp.toString() : "--";

  const ownStyle = currentUserId == user?.userId ? "bg-ludo-accent" : ""

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1 lg:gap-2">
      <div className="flex min-w-0 flex-col items-center gap-1 lg:gap-2">
        <Avatar className="size-10 lg:size-13" src={avatarSrc} />
        <div className="w-full flex flex-col min-w-0 items-center">
          <p className="w-full truncate text-center text-xs lg:text-base">
            {displayName}
          </p>
          <p className="text-sm font-bold lg:text-xl">{points} XP</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-t-xl bg-ludo-surface",
          podiumHeights[rank],
          ownStyle
        )}
      >
        <p
          className={cn(
            "font-bold leading-none text-ludo-accent-muted",
            podiumRankNumberSize[rank],
          )}
        >
          {rank}
        </p>
      </div>
    </div>
  );
}
