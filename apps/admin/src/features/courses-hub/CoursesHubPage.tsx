import { qo } from "@/queries/definitions/queries.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Hero } from "@ludocode/design-system/zones/hero.tsx";
import { coursesHeroContent } from "./content.ts";
import { CoursesPane } from "@/features/courses-hub/zones/CoursesPane.tsx";

export function CoursesHubPage() {
  const { data: courses } = useSuspenseQuery(qo.allCourses());

  return (
    <div className="layout-grid col-span-full scrollable py-10 px-6 lg:px-0">
      <div className="col-span-1 lg:bg-ludo-background" />

      <div className="col-span-10 flex flex-col gap-12 min-w-0">
        {/* HERO */}
        <Hero {...coursesHeroContent}/>

        {/* CONTENT */}
        <div className="grid grid-cols-12 gap-12">
          <CoursesPane className="col-span-8" courses={courses} />
        </div>
      </div>

      <div className="col-span-1 lg:bg-ludo-background" />
    </div>
  );
}
