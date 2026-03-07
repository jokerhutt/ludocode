import type { LudoCourse } from "@ludocode/types";
import { CourseCard } from "../components/CourseCard.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { ShadowLessButton } from "@ludocode/design-system/primitives/shadowless-button.tsx";
import { useCreateYamlCourse } from "@/queries/mutations/useCreateYamlCourse.tsx";
import { useRef, useState } from "react";
import { CreateCourseDialog } from "../components/CreateCourseDialog.tsx";

type CoursesPaneProps = { className?: string; courses: LudoCourse[] };

export function CoursesPane({ className, courses }: CoursesPaneProps) {
  const yamlInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadYamlCourse, isPending: isUploadingYaml } =
    useCreateYamlCourse();

  function handleYamlFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadYamlCourse(file);
    e.target.value = "";
  }

  const [openCreateCourse, setOpenCreateCourse] = useState(false);

  return (
    <div className={cn("col-span-8 flex flex-col gap-6", className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-lg text-ludo-white font-semibold tracking-wide">
          Courses
        </h2>

        <div className="flex justify-end items-center gap-3">
          <input
            ref={yamlInputRef}
            type="file"
            accept=".yaml,.yml,application/x-yaml,text/yaml"
            className="hidden"
            onChange={handleYamlFileChange}
          />
          <ShadowLessButton
            variant="white"
            className="px-4 h-8 w-auto py-1 text-sm"
            onClick={() => yamlInputRef.current?.click()}
            disabled={isUploadingYaml}
          >
            {isUploadingYaml ? "Uploading…" : "Create from YAML"}
          </ShadowLessButton>
          <CreateCourseDialog
            open={openCreateCourse}
            close={() => setOpenCreateCourse(false)}
          >
            <ShadowLessButton
              variant="alt"
              className="px-4 h-8 w-auto py-1 text-sm"
              onClick={() => setOpenCreateCourse(true)}
            >
              Create
            </ShadowLessButton>
          </CreateCourseDialog>
        </div>
      </div>

      {courses.length === 0 && (
        <div className="text-ludo-white text-sm opacity-60">
          No courses created yet.
        </div>
      )}

      {courses.map((course) => (
        <CourseCard course={course} />
      ))}
    </div>
  );
}
