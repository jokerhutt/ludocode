import { useState } from "react";

import { SubjectsPane } from "./SubjectsPane";
import type { SubjectsDraftSnapshot } from "@ludocode/types";
import { SubjectDetailPane } from "./SubjectDetailPane";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";


export function SubjectsPage() {


  const {data: courses} = useSuspenseQuery(qo.allCourses())

  const [subjects, setSubjects] = useState<SubjectsDraftSnapshot[]>([
    { id: "1", name: "Python", slug: "python" },
    { id: "2", name: "Java", slug: "java" },
  ]);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = subjects.find((s) => s.id === selectedId) ?? null;

  const updateSubject = (id: string, patch: Partial<SubjectsDraftSnapshot>) =>
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    );

  return (
    <div className="col-span-10 min-h-0 w-full h-full flex flex-col gap-8">
      {/* HEADER */}
      <div className="border-b border-b-ludo-accent-muted pb-6">
        <h1 className="text-white text-3xl font-bold">Subjects</h1>
        <p className="text-ludoAltText text-sm">
          Manage available learning subjects.
        </p>
      </div>

      {/* BODY */}
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
    </div>
  );
}