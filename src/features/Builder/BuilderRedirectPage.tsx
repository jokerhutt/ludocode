import { qo } from "@/Hooks/Queries/Definitions/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BuilderRedirectHero } from "./BuilderRedirectHero";
import { CreateCourseDialog } from "@/components/Molecules/Dialog/Create/CreateCourseDialog";
import { useModal } from "@/Hooks/UI/useModal";
import { uuid } from "@tanstack/react-form";
import { BuilderCourseCard } from "./BuilderCourseCard";

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
      <div className="grid col-span-full min-h-0 overflow-y-auto p-8 h-full grid-cols-12">
        <div className="col-span-1 lg:bg-ludoGrayDark lg:col-span-2"></div>
        <div className="col-span-10 relative lg:col-span-8 flex flex-col gap-8 items-stretch justify-start min-w-0">
          <BuilderRedirectHero openCreateCourse={() => openCreateCourse()} />
          {courses.map((course) => (
            <BuilderCourseCard
              key={course.id}
              id={course.id}
              title={course.title}
            />
          ))}
        </div>
        <div className="col-span-1 lg:bg-ludoGrayDark lg:col-span-2"></div>
      </div>
      <CreateCourseDialog
        hash={uuid()}
        open={createCourseOpen}
        close={closeCreateCourse}
      />
    </>
  );
}
