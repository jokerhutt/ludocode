import { useState } from "react";

import { SubjectsPane } from "./SubjectsPane";
import { subjectsDraftSchema, type SubjectsDraftSnapshot } from "@ludocode/types";
import { SubjectDetailPane } from "./SubjectDetailPane";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { useAppForm } from "../types";



export function SubjectsPage() {
  const { data: courses } = useSuspenseQuery(qo.allCourses());
  const { data: subjectsFromApi } = useSuspenseQuery(qo.allSubjects());

  const form = useAppForm({
    defaultValues: {
      subjects: subjectsFromApi,
    },
    validators: {
      onSubmit: subjectsDraftSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Submit subjects", value);
    },
  });

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const subjects = form.state.values.subjects;

  const selected =
    selectedId == null
      ? null
      : subjects.find((s) => s.id === selectedId) ?? null;

  const updateSubject = (
    id: number,
    patch: { name?: string; slug?: string }
  ) => {
    const index = subjects.findIndex((s) => s.id === id);
    if (index === -1) return;

    if (patch.name !== undefined) {
      form.setFieldValue(`subjects[${index}].name`, patch.name);
    }

    if (patch.slug !== undefined) {
      form.setFieldValue(`subjects[${index}].slug`, patch.slug);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="col-span-10 min-h-0 w-full h-full flex flex-col gap-8"
    >
      <div className="border-b border-b-ludo-accent-muted pb-6">
        <h1 className="text-white text-3xl font-bold">Subjects</h1>
        <p className="text-ludoAltText text-sm">
          Manage available learning subjects.
        </p>
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
              courses={courses}
              subject={selected}
              onUpdate={(patch) => updateSubject(selected.id, patch)}
            />
          )}
        </aside>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!form.state.canSubmit}
          className="bg-ludo-accent px-4 py-2 rounded-sm text-sm"
        >
          Save
        </button>
      </div>
    </form>
  );
}