import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { UserCard } from "../Components/Card/UserCard";
import { ProfileCardContainer } from "../Components/Card/ProfileCardContainer";
import { UserStatsGroup } from "../Components/Group/UserStatsGroup";
import { BadgeListCard } from "../Components/Card/BadgeCard";
import { CourseCard } from "@/features/Courses/Components/CourseCard";
import type { IconName } from "@ludocode/design-system/primitives/custom-icon";

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

  return (
    <div className="col-span-full px-4 relative pt-6 lg:col-span-6 flex flex-col gap-2 lg:gap-0 lg:items-center h-full min-h-0 justify-start min-w-0">
      <UserCard user={user} />
      <div className="w-full flex pb-6 flex-col gap-4">
        <ProfileCardContainer header="STATS">
          <UserStatsGroup />
        </ProfileCardContainer>

        <ProfileCardContainer header="CURRENT COURSE">
          <CourseCard
            iconName={currentCourseObject?.language?.iconName as IconName | undefined}
            courseId={currentCourseId}
            title={currentCourseObject?.title ?? ""}
            showProgress
          />
        </ProfileCardContainer>

        <ProfileCardContainer header="BADGES">
          <BadgeListCard
            allCourses={allCourses}
            allCourseStats={allCourseStats}
          />
        </ProfileCardContainer>
      </div>
    </div>
  );
}
