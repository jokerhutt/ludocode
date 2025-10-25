import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LessonCompletionPacket } from "../../../Types/Exercise/LessonCompletionResponse";
import { SUBMIT_LESSON } from "../../../constants/pathConstants";
import type { LessonSubmission } from "../../../Types/Exercise/LessonSubmissionTypes";
import { qk } from "../../../constants/qk";
import { router } from "../../../routes/router";
import { ludoNavigation } from "../../../routes/ludoNavigation";
import { mutations } from "../Definitions/mutations";

type Args = {
  oldStreak: number;
};

export function useSubmitLesson({ oldStreak }: { oldStreak: number }) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.submitLesson(oldStreak),
    onSuccess: (payload) => {
      if (payload.status === "DUPLICATE") return;

      const { newStats, newCourseProgress, updatedCompletedLesson, accuracy } =
        payload.content;

      qc.setQueryData(
        qk.lesson(updatedCompletedLesson.id),
        updatedCompletedLesson
      );
      qc.setQueryData(
        qk.courseProgress(newCourseProgress.id),
        newCourseProgress
      );
      qc.setQueryData(qk.userStats(newStats.userId), newStats);

      const { coins, streak } = newStats;
      router.navigate(
        ludoNavigation.completion.toComplete(coins, accuracy, oldStreak, streak)
      );
    },
  });
}
