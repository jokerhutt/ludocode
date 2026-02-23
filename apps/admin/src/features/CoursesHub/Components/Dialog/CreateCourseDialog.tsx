import { DialogTitle } from "@ludocode/external/ui/dialog";
import { type ReactNode, useState } from "react";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LudoInput } from "@ludocode/design-system/primitives/input";
import { Spinner } from "@ludocode/external/ui/spinner";
import {
  LudoSelect,
  LudoSelectItem,
} from "@ludocode/design-system/primitives/select";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { useCreateCourse } from "@/hooks/Queries/Mutations/useCreateCourse";
import { createCourseSchema, type CourseType } from "@ludocode/types";

type Props = {
  open: boolean;
  close: () => void;
  children: ReactNode;
};

export function CreateCourseDialog({ open, close, children }: Props) {
  const { data: subjects } = useSuspenseQuery(qo.allSubjects());
  const { data: languages } = useSuspenseQuery(qo.languages());

  const createMutation = useCreateCourse();

  const [courseTitle, setCourseTitle] = useState("");
  const [courseSubjectId, setCourseSubjectId] = useState<number>(0);
  const [languageId, setLanguageId] = useState<number | undefined>();
  const [courseType, setCourseType] = useState<CourseType>("COURSE");

  const COURSE_TYPES: CourseType[] = ["COURSE", "SKILL_PATH"];

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isLoading = createMutation.isPending;
  const NONE_VALUE = "__none__";
  const handleCreate = () => {
    const result = createCourseSchema.safeParse({
      courseTitle,
      courseSubjectId,
      languageId,
      courseType,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    createMutation.mutate(
      {
        ...result.data,
        languageId: result.data.languageId ?? null,
        requestHash: crypto.randomUUID(),
      },
      {
        onSuccess: () => {
          setCourseTitle("");
          setCourseSubjectId(0);
          setLanguageId(undefined);
          setCourseType("COURSE");
          close();
        },
      },
    );
  };

  return (
    <LudoDialog
      trigger={children}
      open={open}
      onOpenChange={(next) => {
        if (!next) close();
      }}
      className="max-w-3xl" // 👈 wider
    >
      <DialogTitle className="text-white font-bold text-xl">
        Create Course
      </DialogTitle>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <LudoInput
          containerClassName="col-span-2"
          variant="dark"
          title="Course Title"
          value={courseTitle}
          setValue={setCourseTitle}
          error={errors.courseTitle}
        />

        <LudoSelect
          variant="dark"
          title="Subject"
          value={courseSubjectId.toString()}
          setValue={(v) => setCourseSubjectId(Number(v))}
          error={errors.courseSubjectId}
        >
          {subjects.map((s) => (
            <LudoSelectItem key={s.id} value={s.id.toString()}>
              {s.name}
            </LudoSelectItem>
          ))}
        </LudoSelect>

        <LudoSelect
          variant="dark"
          title="Language (optional)"
          value={languageId ? languageId.toString() : NONE_VALUE}
          setValue={(v) =>
            setLanguageId(v === NONE_VALUE ? undefined : Number(v))
          }
        >
          <LudoSelectItem value={NONE_VALUE}>None</LudoSelectItem>

          {languages.map((l) => (
            <LudoSelectItem key={l.languageId} value={l.languageId.toString()}>
              {l.name}
            </LudoSelectItem>
          ))}
        </LudoSelect>

        <LudoSelect
          variant="dark"
          title="Course Type"
          value={courseType}
          setValue={(v) => setCourseType(v as any)}
          error={errors.courseType}
        >
          {COURSE_TYPES.map((type) => (
            <LudoSelectItem key={type} value={type}>
              {type}
            </LudoSelectItem>
          ))}
        </LudoSelect>

        <div className="col-span-2 pt-4">
          <LudoButton
            disabled={isLoading}
            variant="alt"
            onClick={handleCreate}
            className="w-full flex justify-center"
          >
            Create Course
            {isLoading && <Spinner className="ml-2 text-ludo-accent-muted" />}
          </LudoButton>
        </div>
      </div>
    </LudoDialog>
  );
}
