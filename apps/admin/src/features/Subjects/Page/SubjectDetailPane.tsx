import {
  CurriculumPreviewContent,
  CurriculumPreviewFooter,
  CurriculumPreviewHeader,
} from "@/features/Curriculum/Components/CurriculumList";
import { LudoInput } from "@ludocode/design-system/primitives/input";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { ShadowLessButton } from "@ludocode/design-system/primitives/ShadowLessButton";
import type { LudoCourse, SubjectsDraftSnapshot } from "@ludocode/types";
import { useState } from "react";

type SubjectDetailPaneProps = {
  courses: LudoCourse[];
  subject: SubjectsDraftSnapshot;
  onUpdate: (patch: Partial<SubjectsDraftSnapshot>) => void;
};

export function SubjectDetailPane({
  courses,
  subject,
  onUpdate,
}: SubjectDetailPaneProps) {
  const coursesForSubject = courses.filter(
    (c) => c.subject.slug === subject.slug,
  );

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex rounded-lg min-h-0 text-white border-3 border-ludo-border h-full flex-col w-full">
      <CurriculumPreviewHeader>
        <p className="text-white font-bold">Subject</p>
        <div className="flex gap-3">
          {isEditing && (
            <ShadowLessButton
              variant="white"
              onClick={() => setIsEditing((v) => !v)}
            >
              <p className="text-sm">Abort</p>
            </ShadowLessButton>
          )}

          <ShadowLessButton onClick={() => setIsEditing((v) => !v)}>
            <p className="text-sm">{isEditing ? "Save" : "Edit Subject"}</p>
          </ShadowLessButton>
        </div>
      </CurriculumPreviewHeader>

      <CurriculumPreviewContent className="bg-ludo-background p-6 gap-6">
        {/* TOP ROW */}
        <div className="flex gap-8 items-start">
          {!isEditing ? (
            <>
              <div className="flex flex-col gap-1 w-1/2">
                <p className="text-xs text-ludoAltText">Name</p>
                <p className="text-sm">{subject.name}</p>
              </div>

              <div className="flex flex-col gap-1 w-1/2">
                <p className="text-xs text-ludoAltText">Slug</p>
                <p className="text-sm text-ludo-accent-muted">
                  /{subject.slug}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2 w-1/2">
                <p className="text-xs text-ludoAltText">Name</p>
                <LudoInput
                  value={subject.name}
                  setValue={(v) => onUpdate({ name: v })}
                />
              </div>

              <div className="flex flex-col gap-2 w-1/2">
                <p className="text-xs text-ludoAltText">Slug</p>
                <LudoInput
                  value={subject.slug}
                  setValue={(v) => onUpdate({ slug: v })}
                />
              </div>
            </>
          )}
        </div>

        {/* DIVIDER */}
        <div className="border-t border-ludo-border w-full" />

        {/* COURSES SECTION */}
        <div className="flex flex-col gap-3">
          <p className="text-xs text-ludoAltText">Attached Courses</p>
          {coursesForSubject.map((course) => (
            <div className="bg-ludo-surface rounded-sm px-4 py-2 text-sm text-ludoAltText">
              {course.title}
            </div>
          ))}
        </div>
      </CurriculumPreviewContent>

      <CurriculumPreviewFooter>
        <p className="text-xs">Attached to 3 courses</p>
        <ShadowLessButton
          disabled={coursesForSubject.length > 0}  
          variant="danger"
          onClick={() => setIsEditing((v) => !v)}
        >
          <p className="text-sm">Delete</p>
        </ShadowLessButton>
      </CurriculumPreviewFooter>
    </div>
  );
}
