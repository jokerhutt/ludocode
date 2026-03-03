import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "../Definitions/mutations";
import { qk } from "../Definitions/qk";

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
