import { useSuspenseQuery } from "@tanstack/react-query";
import { LeaderboardItemRow } from "./components/LeaderboardItemRow";
import { LeaderboardList } from "./components/LeaderboardList";
import { LeaderboardPodium } from "./components/LeaderboardPodium";
import { qo } from "@/queries/definitions/queries";

type LeaderboardPageProps = {};

const mockUsers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function LeaderboardPage({}: LeaderboardPageProps) {

  const {data: leaderboard} = useSuspenseQuery(qo.weeklyLeaderboard())

  if (!leaderboard.userQualifies) {

  }

  return (
    <div className="layout-grid col-span-full h-full min-h-0 overflow-hidden px-8 py-6 text-ludo-white lg:px-0">
      <div className="col-span-1 hidden lg:block" />
      <div className="col-span-full flex min-h-0 min-w-0 flex-col justify-start gap-6 overflow-hidden lg:col-span-10">
        {/* <div className="w-full h-20">

        </div> */}
        <LeaderboardPodium />
        <LeaderboardList>
          {mockUsers.map((user) => (
            <LeaderboardItemRow
              position={user}
              username="demo_user"
              avatar="v1"
              isUser={user == 3}
              points={user * 2}
            />
          ))}
        </LeaderboardList>
      </div>
      <div className="col-span-1 hidden lg:block" />
    </div>
  );
}

function NotQualifiedForLeaderboardPage() {

  

}
