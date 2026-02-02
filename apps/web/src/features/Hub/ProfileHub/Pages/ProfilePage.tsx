import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { UserCard } from "../Components/Card/UserCard";
import { AccountActionsGroup } from "../Components/Group/AccountActionsGroup";
import { ProfileCardContainer } from "../Components/Card/ProfileCardContainer";
import { UserStatsGroup } from "../Components/Group/UserStatsGroup";
import { CurrentCourseCard } from "../Components/Card/CurrentCourseCard";
import { BadgeCard } from "../Components/Card/BadgeCard";

type ProfilePageProps = {};

export function ProfilePage({}: ProfilePageProps) {
  const { data: user } = useSuspenseQuery(qo.currentUser());
  const { data: currentCourseId } = useSuspenseQuery(qo.currentCourseId());

  const { data: allCourses } = useSuspenseQuery(qo.allCourses());
  const results = useSuspenseQueries({
    queries: allCourses.map((course) => qo.courseStats(course.id)),
  });
  const allCourseStats = results.map((r) => r.data);

  const currentCourseObject = allCourses.find(
    (course) => course.id === currentCourseId,
  );

  const currentCourseStats = allCourseStats.find(
    (courseStat) => courseStat.id === currentCourseId,
  );

  return (
    <div className="col-span-full px-4 relative lg:col-span-6 flex flex-col gap-2 lg:gap-0 lg:items-center h-full min-h-0 justify-start min-w-0">
      <UserCard user={user} />
      <AccountActionsGroup userId={user.id} />
      <div className="w-full h-full flex flex-col gap-5">
        <ProfileCardContainer header="STATS">
          <UserStatsGroup />
        </ProfileCardContainer>

        <ProfileCardContainer header="CURRENT COURSE">
          <CurrentCourseCard
            courseName={currentCourseObject!!.title}
            courseStats={currentCourseStats!!}
          />
        </ProfileCardContainer>
        <ProfileCardContainer header="BADGES">
          <BadgeCard allCourses={allCourses} allCourseStats={allCourseStats} />
        </ProfileCardContainer>
      </div>
    </div>
  );
}
