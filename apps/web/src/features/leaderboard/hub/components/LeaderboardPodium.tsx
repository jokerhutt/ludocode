import { getUserAvatar } from "@/constants/avatars/avatars";
import { cn } from "@ludocode/design-system/cn-utils";
import { Avatar } from "@ludocode/design-system/primitives/avatar";
import { Medal } from "lucide-react";

type LeaderboardPodiumProps = {};

const podiumHeights = {
  1: "h-24",
  2: "h-20",
  3: "h-16",
};

const podiumRankNumberSize = {
  1: "text-4xl",
  2: "text-3xl",
  3: "text-[1.75rem]",
};

export function LeaderboardPodium({}: LeaderboardPodiumProps) {
  return (
    <div className="flex w-full items-end gap-2">
      <PodiumPlayer username="user_12345564" rank={2} points={1000} />
      <PodiumPlayer username="user_1" rank={1} points={1342} />
      <PodiumPlayer username="user_1" rank={3} points={749} />
    </div>
  );
}

type PodiumPlayerProps = { username: string; rank: 1 | 2 | 3; points: number };

function PodiumPlayer({ username, rank, points }: PodiumPlayerProps) {
  const avatarSrc = getUserAvatar("v1", rank);

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-2">
      <div className="flex min-w-0 items-center flex-col gap-2">
        <Avatar className="h-13 w-13 lg:h-13 lg:w-13" src={avatarSrc} />
        <div className="w-full flex flex-col min-w-0 items-center">
          <p className="w-full truncate text-center">{username}</p>
          <p className="font-bold text-xl">{points} XP</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-t-xl bg-ludo-surface",
          podiumHeights[rank],
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
