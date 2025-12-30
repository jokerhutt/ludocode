import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useModal } from "@/hooks/UI/useModal.tsx";
import { uuid } from "@tanstack/react-form";
import { BuilderHubCourseCard } from "@/features/Hub/BuilderHub/Components/Card/BuilderHubCourseCard.tsx";
import { CreateCourseDialog } from "@/features/Hub/BuilderHub/Components/Dialog/CreateCourseDialog.tsx";
import { Hero } from "../../../../../../../packages/design-system/zones/hero.tsx";
import { builderHeroContent } from "../content.ts";
import { LudoButton } from "../../../../../../../packages/design-system/primitives/ludo-button.tsx";

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
      <div className="layout-grid col-span-full scrollable py-6 px-8 lg:px-0">
        <div className="col-span-1 lg:bg-ludoGrayDark lg:col-span-2"></div>
        <div className="col-span-10 relative lg:col-span-8 flex flex-col gap-8 items-stretch justify-start min-w-0">
          <Hero {...builderHeroContent}>
            <LudoButton
              className="w-full lg:w-1/3 lg:h-10 h-full px-4 "
              variant="alt"
              onClick={() => openCreateCourse()}
            >
              Create
            </LudoButton>
          </Hero>
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
