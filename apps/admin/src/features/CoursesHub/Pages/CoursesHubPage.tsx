import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { Hero } from "@ludocode/design-system/zones/hero.tsx";
import { coursesHeroContent } from "../content";
import { router } from "@/main";
import { adminNavigation } from "@/constants/adminNavigation";
import { ShadowLessButton } from "@ludocode/design-system/primitives/ShadowLessButton";

export function CoursesHubPage() {
  const { data: courses } = useSuspenseQuery(qo.allCourses());
  const { data: subjects } = useSuspenseQuery(qo.allSubjects());

  return (
    <>
      <div className="layout-grid col-span-full scrollable py-6 px-8 lg:px-0">
        <div className="col-span-1 lg:bg-ludo-background lg:col-span-2"></div>
        <div className="col-span-10 relative lg:col-span-8 flex flex-col gap-8 items-stretch justify-start min-w-0">
          <Hero {...coursesHeroContent}>
            <div className="flex w-full justify-end items-end gap-4">
              <LudoButton className="w-1/3 px-2" variant="alt">
                Instructions
              </LudoButton>
              <LudoButton variant="alt" className="w-1/3 px-2">
                Create Course
              </LudoButton>
            </div>
          </Hero>
          <div className="w-full grid grid-cols-12 gap-10">
            <div className="flex flex-col col-span-8 gap-6">
              <h1 className="text-lg text-ludoAltText font-bold">Courses</h1>
              {courses.map((course) => (
                <LudoButton
                  onClick={() =>
                    router.navigate(
                      adminNavigation.curriculum.toCourse(course.id),
                    )
                  }
                  className="w-full flex p-6 h-auto items-start flex-col"
                >
                  <p className="text-lg font-bold">{course.title}</p>
                  <p className="">Subject: {course.subject.name}</p>
                  <p className="">Language: {course.language?.name}</p>
                </LudoButton>
              ))}
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex gap-2 items-center">
                <h1 className="text-lg text-ludoAltText font-bold">Subjects</h1>
                <ShadowLessButton
                  onClick={() =>
                    router.navigate(adminNavigation.subjects.toSubjects())
                  }
                >
                  Edit
                </ShadowLessButton>
              </div>
              {subjects.map((subject) => (
                <div className="w-full flex flex-col text-white gap-2 pb-4 border-b h-auto justify-start items-start">
                  <div className="flex w-full gap-4">
                    <p>
                      {subject.name}
                      <span className="text-sm pl-2 text-ludoAltText">
                        ({subject.slug})
                      </span>
                    </p>
                    <LudoButton
                      className="h-6 w-8 rounded-sm"
                      variant="alt"
                    ></LudoButton>
                    <LudoButton
                      className="h-6 w-8 rounded-sm"
                      variant="danger"
                    ></LudoButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:bg-ludo-background lg:col-span-2"></div>
      </div>
    </>
  );
}
