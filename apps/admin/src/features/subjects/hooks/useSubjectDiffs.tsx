import { useMemo } from "react";
import type { SubjectsDraftSnapshot } from "@ludocode/types";

export type SubjectFieldDiff = {
  field: "name" | "slug";
  hasChanged: boolean;
  oldValue: string;
  newValue: string;
};

export function useSubjectDiffs({
  currentSubject,
  name,
  slug,
}: {
  currentSubject?: SubjectsDraftSnapshot;
  name: string;
  slug: string;
}): SubjectFieldDiff[] {
  return useMemo(() => {
    if (!currentSubject) return [];

    const diffs: SubjectFieldDiff[] = [
      {
        field: "name",
        oldValue: currentSubject.name,
        newValue: name,
        hasChanged: currentSubject.name !== name,
      },
      {
        field: "slug",
        oldValue: currentSubject.slug,
        newValue: slug,
        hasChanged: currentSubject.slug !== slug,
      },
    ];

    return diffs;
  }, [currentSubject, name, slug]);
}