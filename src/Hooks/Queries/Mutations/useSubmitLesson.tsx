import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LessonCompletionPacket } from "../../../Types/Exercise/LessonCompletionResponse";
import { SUBMIT_LESSON } from "../../../constants/pathConstants";
import type { LessonSubmission } from "../../../Types/Exercise/LessonSubmissionTypes";
import { qk } from "../../../constants/qk";

export function useChangeCourse() {
  const qc = useQueryClient();

  return useMutation<LessonCompletionPacket, Error, LessonSubmission>({
    mutationFn: async (
      variables: LessonSubmission
    ): Promise<LessonCompletionPacket> => {
      const { id, moduleId, lessonId, submissions } = variables;

      const res = await fetch(SUBMIT_LESSON, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, moduleId, lessonId, submissions }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to submit completion");

      const data = (await res.json()) as LessonCompletionPacket;
      return data;
    },
    onSuccess: (payload: LessonCompletionPacket) => {
      const status = payload.status;
      if (status == "DUPLICATE") return;

      const content = payload.content;
      const { newStats, newCourseProgress, updatedCompletedLesson } = content;

      qc.setQueryData(qk.lesson(updatedCompletedLesson.id), updatedCompletedLesson);
      qc.setQueryData(qk.courseProgress(newCourseProgress.id), newCourseProgress)
      qc.setQueryData(qk.userStats(newStats.userId), newStats)

        
      

    },
  });
}
