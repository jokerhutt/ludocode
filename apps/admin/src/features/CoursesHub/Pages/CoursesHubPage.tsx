import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { Hero } from "@ludocode/design-system/zones/hero.tsx";
import { coursesHeroContent } from "../content";
import { useRef, useState } from "react";
import { CreateCourseDialog } from "../Components/Dialog/CreateCourseDialog";
import { SubjectsPane } from "../Components/Pane/SubjectsPane";
import { CoursesPane } from "../Components/Pane/CoursesPane";
import { useCreateYamlCourse } from "@/hooks/Queries/Mutations/useCreateYamlCourse.tsx";

export function CoursesHubPage() {
  const { data: courses } = useSuspenseQuery(qo.allCourses());
  const { data: subjects } = useSuspenseQuery(qo.allSubjects());

  const [openCreateCourse, setOpenCreateCourse] = useState(false);
  const yamlInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadYamlCourse, isPending: isUploadingYaml } =
    useCreateYamlCourse();

  function handleYamlFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadYamlCourse(file);
    e.target.value = "";
  }

  return (
    <div className="layout-grid col-span-full scrollable py-10 px-6 lg:px-0">
      <div className="col-span-1 lg:bg-ludo-background" />

      <div className="col-span-10 flex flex-col gap-12 min-w-0">
        {/* HERO */}
        <Hero {...coursesHeroContent}>
          <div className="flex w-full justify-end gap-4">
            <input
              ref={yamlInputRef}
              type="file"
              accept=".yaml,.yml,application/x-yaml,text/yaml"
              className="hidden"
              onChange={handleYamlFileChange}
            />
            <LudoButton
              variant="white"
              className="px-6"
              onClick={() => yamlInputRef.current?.click()}
              disabled={isUploadingYaml}
            >
              {isUploadingYaml ? "Uploading…" : "Import YAML"}
            </LudoButton>
            <CreateCourseDialog
              open={openCreateCourse}
              close={() => setOpenCreateCourse(false)}
            >
              <LudoButton
                variant="alt"
                className="px-6"
                onClick={() => setOpenCreateCourse(true)}
              >
                Create Course
              </LudoButton>
            </CreateCourseDialog>
          </div>
        </Hero>

        {/* CONTENT */}
        <div className="grid grid-cols-12 gap-12">
          <CoursesPane className="col-span-8" courses={courses} />

          <SubjectsPane className="col-span-4" subjects={subjects} />
        </div>
      </div>

      <div className="col-span-1 lg:bg-ludo-background" />
    </div>
  );
}
