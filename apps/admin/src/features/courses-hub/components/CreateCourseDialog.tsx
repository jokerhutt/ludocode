import { DialogTitle } from "@ludocode/external/ui/dialog.tsx";
import { type ReactNode, useState } from "react";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { LudoInput } from "@ludocode/design-system/primitives/input.tsx";
import { Spinner } from "@ludocode/external/ui/spinner.tsx";
import {
  LudoSelect,
  LudoSelectItem,
} from "@ludocode/design-system/primitives/select.tsx";
import { useCreateCourse } from "@/queries/mutations/useCreateCourse.tsx";
import { type CourseType, type LanguageKey } from "@ludocode/types";
import { Languages } from "@ludocode/types/Project/ProjectFileSnapshot";
import {
  CustomIcon,
  IconRegistry,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon";

type Props = {
  open: boolean;
  close: () => void;
  children: ReactNode;
};

const languageIcons = Object.entries(IconRegistry)
  .filter(([_, def]) => def.category === "language")
  .map(([name]) => name as IconName);

export function CreateCourseDialog({ open, close, children }: Props) {
  const createMutation = useCreateCourse();

  const [courseTitle, setCourseTitle] = useState("");
  const [language, setLanguage] = useState<LanguageKey | undefined>();
  const [courseType, setCourseType] = useState<CourseType>("COURSE");
  const [courseIcon, setCourseIcon] = useState<string>("");
  const COURSE_TYPES: CourseType[] = ["COURSE", "SKILL_PATH"];

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isLoading = createMutation.isPending;
  const NONE_VALUE = "__none__";
  const handleCreate = () => {
    const errors: Record<string, string> = {};

    if (!courseTitle.trim()) {
      errors.courseTitle = "Title is required";
    }
    if (!courseIcon) {
      errors.courseIcon = "Icon required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setErrors({});

    createMutation.mutate(
      {
        courseTitle,
        courseIcon,
        language: language ?? null,
        courseType,
        requestHash: crypto.randomUUID(),
      },
      {
        onSuccess: () => {
          setCourseTitle("");
          setLanguage(undefined);
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
      className="max-w-3xl"
    >
      <DialogTitle className="text-ludo-white-bright font-bold text-xl">
        Create Course
      </DialogTitle>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <LudoInput
          containerClassName=""
          variant="dark"
          title="Course Title"
          value={courseTitle}
          setValue={setCourseTitle}
          error={errors.courseTitle}
        />

        <LudoSelect
          variant="dark"
          title="Icon"
          error={errors.courseIcon}
          value={courseIcon}
          setValue={setCourseIcon}
        >
          {languageIcons.map((name) => (
            <LudoSelectItem key={name} value={name}>
              <span className="flex items-center gap-2">
                <CustomIcon iconName={name} color="white" className="h-4 w-4" />
                <span>{name}</span>
              </span>
            </LudoSelectItem>
          ))}
        </LudoSelect>

        <LudoSelect
          variant="dark"
          title="Language (optional)"
          value={language ?? NONE_VALUE}
          setValue={(v) =>
            setLanguage(v === NONE_VALUE ? undefined : (v as LanguageKey))
          }
        >
          <LudoSelectItem value={NONE_VALUE}>None</LudoSelectItem>

          {(Object.keys(Languages) as LanguageKey[]).map((key) => {
            const metadata = Languages[key];
            return (
              <LudoSelectItem key={key} value={key}>
                {metadata.name}
              </LudoSelectItem>
            );
          })}
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
