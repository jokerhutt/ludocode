import { LeaderboardItemRow } from "./components/LeaderboardItemRow";
import { LeaderboardList } from "./components/LeaderboardList";
import { LeaderboardPodium } from "./components/LeaderboardPodium";

type LeaderboardPageProps = {};

const mockUsers = [1, 2, 3, 4, 5];

export function LeaderboardPage({}: LeaderboardPageProps) {
  return (
    <div className="layout-grid text-ludo-white col-span-full scrollable py-6 px-8 lg:px-0">
      <div className="col-span-1 hidden lg:block" />
      <div className="col-span-full lg:col-span-10 flex flex-col gap-6 justify-start min-w-0">
        <div className="w-full h-30">

        </div>
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
