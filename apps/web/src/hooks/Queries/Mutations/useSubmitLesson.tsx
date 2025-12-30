import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "../Definitions/qk.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { mutations } from "../Definitions/mutations.ts";
import { useRouter } from "@tanstack/react-router";

type Args = {
  oldStreak: number;
};

export function useSubmitLesson({ oldStreak }: Args) {
  const qc = useQueryClient();
  const router = useRouter();

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
      const moduleId = newCourseProgress.moduleId;
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
          moduleId,
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
