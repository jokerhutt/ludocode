import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";

type useUpdateLessonProps = {
  lessonId: string;
};

export function useUpdateLesson({lessonId}: useUpdateLessonProps) {

    const qc = useQueryClient()

  return useMutation({
    ...mutations.updateLesson(lessonId),
    onSuccess: (payload) => {
      qc.setQueryData(qk.curriculumLesson(lessonId), payload);
    },
  });

}
