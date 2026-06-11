import { useSuspenseQuery } from "@tanstack/react-query";
import { LeaderboardItemRow } from "./components/LeaderboardItemRow";
import { LeaderboardList } from "./components/LeaderboardList";
import { LeaderboardPodium } from "./components/LeaderboardPodium";
import { qo } from "@/queries/definitions/queries";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LockKeyhole, Play, Trophy } from "lucide-react";
import { useCurrentCourseContext } from "@/features/course/context/CurrentCourseContext";
import { useSuspenseDataArray } from "@/queries/util/useSuspenseDataArray";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { router } from "@/main";
import type { LudoUser } from "@ludocode/types";
import { useLogout } from "@/queries/mutations/useLogout";

type LeaderboardPageProps = {};

export function LeaderboardPage({}: LeaderboardPageProps) {
  const { data: currentUser } = useSuspenseQuery(qo.currentUser());
  const { data: leaderboard } = useSuspenseQuery(qo.weeklyLeaderboard());
  const leaderboardUsers = leaderboard.leaderboardUsers;

  const podiumUsers = [
    leaderboardUsers.find((u) => u.rank === 2),
    leaderboardUsers.find((u) => u.rank === 1),
    leaderboardUsers.find((u) => u.rank === 3),
  ];

  if (!leaderboard.userQualifies) {
    return <NotQualifiedForLeaderboardPage currentUser={currentUser} />;
  }

  return (
    <div className="layout-grid col-span-full h-full min-h-0 overflow-hidden px-8 py-6 text-ludo-white lg:px-0">
      <div className="col-span-1 hidden lg:block" />
      <div className="col-span-full flex min-h-0 min-w-0 flex-col justify-start gap-6 overflow-hidden lg:col-span-10">
        {/* <div className="w-full h-20">

        </div> */}
        <LeaderboardPodium
          currentUserId={currentUser.id}
          topUsers={podiumUsers}
        />
        <LeaderboardList>
          {leaderboardUsers.map((user) => (
            <LeaderboardItemRow
              position={user.rank}
              username={user.displayName}
              avatarIndex={user.avatarIndex}
              avatarVersion={user.avatarVersion}
              isUser={user.userId == currentUser.id}
              points={user.xp}
            />
          ))}
        </LeaderboardList>
      </div>
      <div className="col-span-1 hidden lg:block" />
    </div>
  );
}

function NotQualifiedForLeaderboardPage({
  currentUser,
}: {
  currentUser: LudoUser;
}) {
  const { courseId, moduleId } = useCurrentCourseContext();
  const { data: tree } = useSuspenseQuery(qo.courseTree(courseId));
  const module = tree.modules.find((module) => module.id === moduleId);
  const lessons = useSuspenseDataArray(
    module?.lessons.map((lesson) => qo.lesson(lesson.id)) ?? [],
  );
  const currentLessonId = lessons.find((lesson) => !lesson.isCompleted)?.id;

  const title = currentUser.isGuest
    ? "Create an account to qualify"
    : "Earn XP to qualify";
  const subtitle = currentUser.isGuest
    ? "The leaderboard is only available to registered users."
    : "Complete a lesson and collect XP this week. Once you have earned some XP, your ranking will appear here.";

  const actionButtonText = currentUser.isGuest
    ? "Join Ludocode"
    : "Start Lesson";

  const logoutMutation = useLogout();

  const onActionButtonClick = () => {
    if (currentUser.isGuest) {
      if (logoutMutation.isPending) return;
      logoutMutation.mutate();
    } else {
      if (!currentLessonId) return;
      router.navigate(
        ludoNavigation.lesson.start(courseId, moduleId, currentLessonId),
      );
    }
  };

  return (
    <div className="layout-grid col-span-full h-full min-h-0 overflow-y-auto px-6 py-6 text-ludo-white lg:px-0">
      <div className="col-span-1 hidden lg:block" />
      <div className="col-span-full flex min-h-full min-w-0 items-center justify-center lg:col-span-10">
        <div className="flex w-full max-w-4xl flex-col items-center gap-7 rounded-xl border border-ludo-border bg-ludo-surface-dim px-5 py-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.18)] lg:px-10 lg:py-10">
          <div className="flex w-full max-w-xl flex-col items-center gap-4">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-xl border border-ludo-white/10 bg-ludo-surface">
              <Trophy className="size-11 text-ludo-accent-muted" />
              <div className="absolute -right-2 -top-2 flex size-9 items-center justify-center rounded-lg bg-ludo-background text-ludo-white-bright ring-1 ring-ludo-border">
                <LockKeyhole className="size-4" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ludo-accent-muted">
                Leaderboard locked
              </p>
              <h1 className="text-2xl font-bold text-ludo-white-bright lg:text-3xl">
                {title}
              </h1>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-ludo-white-bright/70 lg:text-base">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="w-full max-w-sm">
            <LudoButton
              className="h-12 px-5 text-base font-semibold"
              variant="alt"
              type="button"
              disabled={!currentLessonId}
              onClick={() => onActionButtonClick()}
            >
              <Play className="size-4 fill-current" />
              {actionButtonText}
            </LudoButton>
          </div>
        </div>
      </div>
      <div className="col-span-1 hidden lg:block" />
    </div>
  );
}
