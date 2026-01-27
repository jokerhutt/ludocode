import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { UserCard } from "../Components/Card/UserCard";
import { AccountActionsGroup } from "../Components/Group/AccountActionsGroup";
import { ProfileCardContainer } from "../Components/Card/ProfileCardContainer";
import { UserStatsGroup } from "../Components/Group/UserStatsGroup";
import { CurrentCourseCard } from "../Components/Card/CurrentCourseCard";
import { BadgeCard } from "../Components/Card/BadgeCard";

type ProfilePageProps = {};

export function ProfilePage({}: ProfilePageProps) {
  const { data: user } = useSuspenseQuery(qo.currentUser());
  return (
    <div className="layout-grid scrollable col-span-full text-ludoAltText relative px-8 lg:px-0 py-2">
      <div className="hidden lg:block lg:col-span-3" />
      <div className="col-span-full px-4 relative lg:col-span-6 flex flex-col gap-2 lg:gap-0 lg:items-center h-full min-h-0 justify-start min-w-0">
        <UserCard user={user} />
        <div className="w-full h-full flex flex-col gap-5">
          <ProfileCardContainer header="STATS">
            <UserStatsGroup streak={0} commits={0} />
          </ProfileCardContainer>
          <ProfileCardContainer header="CURRENT COURSE">
            <CurrentCourseCard courseName="Python" courseIcon="Python" value={50} />
          </ProfileCardContainer>
          <ProfileCardContainer header="BADGES">
            <BadgeCard/>
          </ProfileCardContainer>
        </div>
        <AccountActionsGroup />
      </div>
      <div className="hidden lg:block lg:col-span-3" />
    </div>
  );
}
