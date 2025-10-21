import { useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../../constants/qk";
import { fetchCourseTreeAndHydrate } from "./fetchCourseTreeAndHydrate";

export function useCourseTree(courseId?: string) {
  const qc = useQueryClient();
  return useQuery({
    queryKey:
      courseId != null
        ? qk.courseTree(courseId)
        : ["courseTree", "pending"],
    enabled: courseId != null,
    queryFn: async () => {
      if (courseId == null) throw new Error("Missing courseId");
      await fetchCourseTreeAndHydrate(qc, courseId);
      return { hydrated: true, sectionId: courseId };
    },
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
}