import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/queries/definitions/qk.ts";
import { mutations } from "@/queries/definitions/mutations.ts";
import type { CurriculumDraft } from "@ludocode/types";

type UseUpdateYamlCourseProps = {
  courseId: string;
};

export function useUpdateYamlCourse({ courseId }: UseUpdateYamlCourseProps) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.updateCourseYaml(courseId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.courses() });
      qc.invalidateQueries({ queryKey: qk.curriculum(courseId) });
    },
  });
}

export function useCreateYamlCourse() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.createCourseYaml(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.courses() });
    },
  });
}

type useUpdateCourseProps = {
  courseId: string;
};

export function useUpdateCourse({ courseId }: useUpdateCourseProps) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.updateCourse(courseId),
    onSuccess: (payload: CurriculumDraft) => {
      qc.setQueryData(qk.curriculum(courseId), payload);
    },
  });
}

type useUpdateLessonProps = {
  lessonId: string;
};

export function useUpdateLesson({ lessonId }: useUpdateLessonProps) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.updateLesson(lessonId),
    onSuccess: (payload) => {
      qc.setQueryData(qk.curriculumLesson(lessonId), payload);
    },
  });
}
