import { LudoInput } from "@ludocode/design-system/primitives/input";
import { ShadowLessButton } from "@ludocode/design-system/primitives/ShadowLessButton";
import type { LudoCourse } from "@ludocode/types";
import type { UseSubjectFormResponse } from "./useSubjectForm";
import type { SubjectFieldDiff } from "../Hooks/useSubjectDiffs";
import { X } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ludocode/external/ui/tooltip";
import {
  CurriculumCardContent,
  CurriculumCardFooter,
  CurriculumCardHeader,
} from "@/features/Curriculum/Components/CurriculumList";

type SubjectDetailPaneProps = {
  courses: LudoCourse[];
  formHook: UseSubjectFormResponse;
  isEditing: boolean;
  onEdit: () => void;
  onClose: () => void;
  onAbort: () => void;
  onDelete: () => void;
  onSave: () => void;
  subjectDiffs: SubjectFieldDiff[];
  hasAnyChange: boolean;
};

export function SubjectDetailPane({
  courses,
  formHook,
  onClose,
  onDelete,
  isEditing,
  onEdit,
  onAbort,
  onSave,
  subjectDiffs,
  hasAnyChange,
}: SubjectDetailPaneProps) {
  const { name, slug, setName, setSlug, errors } = formHook;

  const coursesForSubject = courses.filter((c) => c.subject.slug === slug);

  const canDelete = coursesForSubject.length === 0;

  return (
    <div className="flex rounded-lg min-h-0 text-ludo-white-bright border-3 border-ludo-border h-full flex-col w-full">
      <CurriculumCardHeader>
        <p className="text-ludo-white-bright font-bold">Subject</p>

        <div className="flex gap-3 items-center">
          {isEditing && (
            <ShadowLessButton variant="white" onClick={onAbort}>
              <p className="text-sm">Abort</p>
            </ShadowLessButton>
          )}

          <ShadowLessButton onClick={isEditing ? onSave : onEdit}>
            <p className="text-sm">{isEditing ? "Save" : "Edit Subject"}</p>
          </ShadowLessButton>
          {!isEditing && (
            <X onClick={() => onClose()} className="h-4 hover:cursor-pointer" />
          )}
        </div>
      </CurriculumCardHeader>

      <CurriculumCardContent className="bg-ludo-background p-6 gap-6">
        {/* TOP ROW */}
        <div className="flex gap-8 items-start">
          {!isEditing ? (
            <>
              <div className="flex flex-col gap-1 w-1/2">
                <p className="text-xs text-ludo-white">Name</p>
                <p className="text-sm">{name}</p>
              </div>

              <div className="flex flex-col gap-1 w-1/2">
                <p className="text-xs text-ludo-white">Slug</p>
                <p className="text-sm text-ludo-accent-muted">/{slug}</p>
              </div>
            </>
          ) : (
            <>
              <LudoInput
                containerClassName="w-1/2"
                title="Name"
                value={name}
                setValue={setName}
                error={errors.name}
              />

              <LudoInput
                containerClassName="w-1/2"
                title="Slug"
                value={slug}
                setValue={setSlug}
                error={errors.slug}
              />
            </>
          )}
        </div>

        {isEditing && hasAnyChange && (
          <>
            <div className="border-t border-ludo-border w-full" />

            <div className="flex flex-col gap-3">
              <p className="text-xs text-ludo-white">Changes</p>

              {subjectDiffs
                .filter((d) => d.hasChanged)
                .map((d) => (
                  <div
                    key={d.field}
                    className="flex items-center gap-4 text-sm text-ludo-white"
                  >
                    <span className="font-medium text-ludo-white-bright capitalize">
                      {d.field}
                    </span>

                    <span>:</span>

                    <span className="line-through text-red-400">
                      {d.oldValue || "∅"}
                    </span>

                    <span>→</span>

                    <span className="text-green-400">{d.newValue || "∅"}</span>
                  </div>
                ))}
            </div>
          </>
        )}

        <div className="border-t border-ludo-border w-full" />

        <div className="flex flex-col gap-3">
          <p className="text-xs text-ludo-white">Attached Courses</p>

          {coursesForSubject.length === 0 && (
            <p className="text-sm text-ludo-white/60">No courses attached</p>
          )}

          {coursesForSubject.map((course) => (
            <div
              key={course.id}
              className="bg-ludo-surface rounded-sm px-4 py-2 text-sm text-ludo-white"
            >
              {course.title}
            </div>
          ))}
        </div>
      </CurriculumCardContent>

      <CurriculumCardFooter>
        <p className="text-xs">
          Attached to {coursesForSubject.length} course
          {coursesForSubject.length === 1 ? "" : "s"}
        </p>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <ShadowLessButton
                  disabled={!canDelete}
                  variant="danger"
                  onClick={() => {
                    if (!canDelete) return;
                    onDelete();
                  }}
                >
                  <p className="text-sm">Delete</p>
                </ShadowLessButton>
              </span>
            </TooltipTrigger>

            {!canDelete && (
              <TooltipContent className="bg-ludo-surface" side="top">
                You must first delete attached courses.
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </CurriculumCardFooter>
    </div>
  );
}
