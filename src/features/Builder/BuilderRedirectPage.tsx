import { Button } from "@/components/ui/button";
import { qo } from "@/Hooks/Queries/Definitions/queries";
import { ludoNavigation } from "@/routes/ludoNavigation";
import { router } from "@/routes/router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BuilderRedirectHero } from "./BuilderRedirectHero";
import { CreateCourseDialog } from "@/components/Molecules/Dialog/CreateCourseDialog";
import { useModal } from "@/Hooks/UI/useModal";

type BuilderRedirectPageProps = {};

export function BuilderRedirectPage({}: BuilderRedirectPageProps) {
  const { data: courses } = useSuspenseQuery(qo.allCourses());

  const {
    modalOpen: createCourseOpen,
    openModal: openCreateCourse,
    closeModal: closeCreateCourse,
  } = useModal();

  return (
    <>
      <div className="grid col-span-full p-8 h-full grid-cols-12">
        <div className="col-span-1 bg-ludoGrayDark lg:col-span-2"></div>
        <div className="col-span-10 relative lg:col-span-8 flex flex-col gap-8 items-stretch justify-start min-w-0">
          <BuilderRedirectHero openCreateCourse={() => openCreateCourse()} />
          {courses.map((course) => (
            <div className="w-full text-white rounded-2xl p-6 flex items-center justify-between border-ludoGrayLight border-2">
              <div className="flex flex-col gap-2">
                <h2>{course.title}</h2>
                <p>{course.id}</p>
              </div>
              <Button
                onClick={() =>
                  router.navigate(ludoNavigation.build.toBuilder(course.id))
                }
              >
                Edit Course
              </Button>
            </div>
          ))}
        </div>
        <div className="col-span-1 bg-ludoGrayDark lg:col-span-2"></div>
      </div>
      <CreateCourseDialog open={createCourseOpen} close={closeCreateCourse} />
    </>
  );
}
