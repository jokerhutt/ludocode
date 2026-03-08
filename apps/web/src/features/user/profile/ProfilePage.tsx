import { qo } from "@/queries/definitions/queries.ts";
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { UserCard } from "./components/UserCard.tsx";
import { ProfileCardContainer } from "@/features/user/components/ProfileCardContainer.tsx";
import { UserStatsGroup } from "../../stats/components/UserStatsGroup.tsx";
import { BadgeListCard } from "./components/BadgeCard.tsx";
import { CourseCard } from "@/features/course/hub/components/CourseCard.tsx";

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
    <div className="col-span-full lg:px-4 relative pt-6 lg:col-span-6 flex flex-col gap-2 lg:gap-0 lg:items-center h-full min-h-0 justify-start min-w-0">
      <UserCard user={user} />
      <div className="w-full flex pb-6 flex-col gap-4">
        <ProfileCardContainer header="STATS">
          <UserStatsGroup />
        </ProfileCardContainer>

        <ProfileCardContainer header="CURRENT COURSE">
          <CourseCard
            iconName={currentCourseObject?.courseIcon}
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
