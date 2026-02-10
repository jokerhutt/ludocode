import { useState } from "react";
import { CurriculumPreview } from "../Preview/CurriculumPreview";
import { LessonDetailPreview } from "../LessonDetailPreview";
import type { CurriculumDraftLesson, CurriculumDraft } from "@ludocode/types";
import { CurriculumEditor } from "../Editor/CurriculumEditor";
import { withForm } from "../../types";

export const CurriculumBody = withForm({
  defaultValues: {
    modules: [] as CurriculumDraft["modules"],
  },
  props: {
    isEditing: false,
    onEditClick: () => {},
    onSave: () => {},
    onCancel: () => {},
    canSubmit: false,
    isSubmitting: false,
  },
  render: function Render({
    form,
    isEditing,
    onEditClick,
    onSave,
    onCancel,
    canSubmit,
    isSubmitting,
  }) {
    const [selectedLesson, setSelectedLesson] =
      useState<CurriculumDraftLesson | null>(null);

    return (
      <div className="flex gap-4 min-h-0">
        <div className="w-full flex flex-col h-full">
          {!isEditing ? (
            <CurriculumPreview
              selectedLesson={selectedLesson}
              onLessonClick={setSelectedLesson}
              modules={form.state.values.modules}
              onEditClick={onEditClick}
            />
          ) : (
            <CurriculumEditor
              form={form}
              onSave={onSave}
              onCancel={onCancel}
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>

        <div className="w-1/2 flex min-h-0 flex-col h-full">
          {!isEditing && selectedLesson && (
            <LessonDetailPreview lesson={selectedLesson} />
          )}
        </div>
      </div>
    );
  },
});
