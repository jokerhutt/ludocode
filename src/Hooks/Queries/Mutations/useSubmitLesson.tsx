import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../../constants/qk";
import { router } from "../../../routes/router";
import { ludoNavigation } from "../../../routes/ludoNavigation";
import { mutations } from "../Definitions/mutations";

type Args = {
  oldStreak: number;
};

export function useSubmitLesson({ oldStreak }: Args) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.submitLesson(),
    onSuccess: (payload) => {
      if (payload.status === "DUPLICATE") return;

      const {
        newCoins,
        newStreak,
        newCourseProgress,
        updatedCompletedLesson,
        accuracy,
      } = payload.content;

      const completionStatus = payload.status;

      const courseId = newCourseProgress.id;
      const lessonId = updatedCompletedLesson.id;

      qc.setQueryData(qk.lesson(lessonId), updatedCompletedLesson);
      qc.setQueryData(
        qk.courseProgress(newCourseProgress.id),
        newCourseProgress
      );
      qc.setQueryData(qk.userCoins(newCoins.id), newCoins);
      qc.setQueryData(qk.streak(newCoins.id), newStreak);

      qc.invalidateQueries({ queryKey: qk.streakPastWeek() });

      const { coins } = newCoins;
      const { current } = newStreak;

      router.navigate(
        ludoNavigation.completion.toLessonComplete(
          courseId,
          lessonId,
          coins,
          accuracy,
          oldStreak,
          current,
          completionStatus
        )
      );
    },
  });
}
