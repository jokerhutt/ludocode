import { useEffect, useRef, useState } from "react";
import {
  subjectsDraftSchema,
  type SubjectsDraftSnapshot,
} from "@ludocode/types";

type Args = {
  currentSubject?: SubjectsDraftSnapshot;
  existingSubjects: SubjectsDraftSnapshot[];
};

export function useSubjectForm({
  currentSubject,
  existingSubjects,
}: Args) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [errors, setErrors] = useState<{ name?: string; slug?: string }>({});

  const didInitRef = useRef(false);

  useEffect(() => {
    if (!currentSubject) return;
    if (didInitRef.current) return;

    setName(currentSubject.name);
    setSlug(currentSubject.slug);
    didInitRef.current = true;
  }, [currentSubject]);

  const validate = () => {
    const data = {
      subjects: [
        ...existingSubjects.filter((s) => s.id !== currentSubject?.id),
        {
          id: currentSubject?.id ?? 0,
          name,
          slug,
        },
      ],
    };

    const result = subjectsDraftSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: { name?: string; slug?: string } = {};
      for (const issue of result.error.issues) {
        const key = issue.path.at(-1) as "name" | "slug";
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return null;
    }

    setErrors({});
    return { name, slug };
  };

  const reset = () => {
    if (!currentSubject) return;
    setName(currentSubject.name);
    setSlug(currentSubject.slug);
    setErrors({});
  };

  return {
    name,
    slug,
    setName,
    setSlug,
    errors,
    validate,
    reset,
  };
}

export type UseSubjectFormResponse = ReturnType<typeof useSubjectForm>;