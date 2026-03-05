import { useState } from "react";
import { SubjectsPane } from "./SubjectsPane";
import { SubjectDetailPane } from "./SubjectDetailPane";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { useSubjectForm } from "./useSubjectForm";
import { useSubjectDiffs } from "../Hooks/useSubjectDiffs";
import { useUpdateSubject } from "../Hooks/useUpdateSubject";
import type { SubjectsDraftSnapshot } from "@ludocode/types";
import { useDeleteSubject } from "../Hooks/useDeleteSubject";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { router } from "@/main";
import { adminNavigation } from "@/constants/adminNavigation";

export function SubjectsPage() {
  const { data: courses } = useSuspenseQuery(qo.allCourses());
  const { data: subjects } = useSuspenseQuery(qo.allSubjects());

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const selected =
    selectedId == null
      ? null
      : (subjects.find((s) => s.id === selectedId) ?? null);

  const updateMutation = useUpdateSubject({
    subjectId: selected?.id ?? 0,
  });

  const formHook = useSubjectForm({
    currentSubject: selected ?? undefined,
    existingSubjects: subjects,
  });

  const handleSave = () => {
    const validated = formHook.validate();
    if (!validated || !selected) return;

    const payload: SubjectsDraftSnapshot = {
      id: selected.id,
      name: validated.name,
      slug: validated.slug,
    };

    updateMutation.mutate(payload, {
      onSuccess: () => setIsEditing(false),
    });
  };

  const deleteMutation = useDeleteSubject({ subjectId: selected?.id ?? 0 });

  const handleDelete = () => {
    if (!selected) return;

    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        setIsEditing(false);
        setSelectedId(null);
        formHook.reset();
      },
    });
  };

  const cancelEditing = () => {
    formHook.reset();
    setIsEditing(false);
  };

  const subjectDiffs = useSubjectDiffs({
    currentSubject: selected ?? undefined,
    name: formHook.name,
    slug: formHook.slug,
  });

  const hasAnyChange = subjectDiffs.some((d) => d.hasChanged);

  return (
    <div className="col-span-10 min-h-0 w-full h-full flex flex-col gap-8">
      <div className="border-b flex items-center justify-between border-b-ludo-accent-muted pb-6">
        <div>
          <h1 className="text-ludo-white-bright text-3xl font-bold">
            Subjects
          </h1>
          <p className="text-ludo-white text-sm">
            Manage available learning subjects.
          </p>
        </div>
        <div className="flex flex-col justify-end h-full">
          <LudoButton
            className="w-auto h-8 px-4"
            onClick={() =>
              router.navigate(adminNavigation.hub.courses.toCoursesHub())
            }
            variant="alt"
          >
            Exit
          </LudoButton>
        </div>
      </div>

      <div className="flex gap-4 min-h-0 flex-1">
        <aside className="w-1/2 flex flex-col min-h-0">
          <SubjectsPane
            subjects={subjects}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </aside>

        <aside className="w-1/2 flex flex-col min-h-0">
          {selected && (
            <SubjectDetailPane
              onClose={() => setSelectedId(null)}
              subjectDiffs={subjectDiffs}
              hasAnyChange={hasAnyChange}
              courses={courses}
              formHook={formHook}
              isEditing={isEditing}
              onDelete={handleDelete}
              onEdit={() => setIsEditing(true)}
              onAbort={cancelEditing}
              onSave={handleSave}
            />
          )}
        </aside>
      </div>
    </div>
  );
}
