import { qo } from "@/hooks/Queries/Definitions/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useModal } from "@/hooks/UI/useModal";
import { uuid } from "@tanstack/react-form";
import { BuilderHubCourseCard } from "@/features/Hub/BuilderHub/UI/Card/BuilderHubCourseCard";
import { BuilderHubHero } from "@/features/Hub/BuilderHub/UI/Hero/BuilderHubHero";
import { CreateCourseDialog } from "@/features/Hub/BuilderHub/UI/Dialog/CreateCourseDialog.tsx";

type BuilderHubPageProps = {};

export function BuilderHubPage({}: BuilderHubPageProps) {
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
          <BuilderHubHero openCreateCourse={() => openCreateCourse()} />
          {courses.map((course) => (
            <BuilderHubCourseCard
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
