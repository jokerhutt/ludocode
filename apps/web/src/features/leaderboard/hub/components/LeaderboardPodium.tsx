import { getUserAvatar } from "@/constants/avatars/avatars";
import { cn } from "@ludocode/design-system/cn-utils";
import { Avatar } from "@ludocode/design-system/primitives/avatar";
import { Medal } from "lucide-react";

type LeaderboardPodiumProps = {};

const podiumHeights = {
  1: "h-48",
  2: "h-40",
  3: "h-36",
};

const podiumRankNumberSize = {
  1: "text-4xl",
  2: "text-3xl",
  3: "text-[1.75rem]",
};

export function LeaderboardPodium({}: LeaderboardPodiumProps) {
  return (
    <div className="flex h-80 w-full items-end gap-4">
      <PodiumPlayer username="user_1" rank={2} points={1000} />
      <PodiumPlayer username="user_1" rank={1} points={1342} />
      <PodiumPlayer username="user_1" rank={3} points={749} />
    </div>
  );
}

type PodiumPlayerProps = { username: string; rank: 1 | 2 | 3; points: number };

function PodiumPlayer({ username, rank, points }: PodiumPlayerProps) {
  const avatarSrc = getUserAvatar("v1", rank);

  return (
    <div
      className={cn(
        "relative flex flex-1 flex-col items-center justify-end rounded-t-xl bg-ludo-surface px-3 pb-4",
        podiumHeights[rank],
      )}
    >
      {rank === 1 && (
        <Medal className="absolute left-1/2 -translate-x-1/2 -top-16 h-6 w-6 text-ludo-accent-muted fill-none" />
      )}
      <Avatar
        className="absolute left-1/2 top-0 z-10 h-13 w-13 -translate-x-1/2 -translate-y-1/2 lg:h-13 lg:w-13"
        src={avatarSrc}
      />
      <div className="flex min-h-20 w-full items-end justify-center pt-8">
        <p
          className={cn(
            "font-bold leading-none text-ludo-accent-muted",
            podiumRankNumberSize[rank],
          )}
        >
          {rank}
        </p>
      </div>
      <div className="mt-auto flex flex-col items-center justify-end gap-1 text-center">
        <p>{username}</p>
        <p className="font-bold text-xl">{points} XP</p>
      </div>
    </div>
  );
}
