import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/queries/definitions/qk.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { mutations } from "@/queries/definitions/mutations.ts";
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
      if (payload.status === "DUPLICATE") {
        router.navigate(ludoNavigation.courseRoot());
        return;
      }

      const {
        newCoins,
        newStreak,
        newCourseProgress,
        newXp,
        xpGained,
        updatedCompletedLesson,
        accuracy,
      } = payload.content;

      const completionStatus = payload.status;

      const courseId = newCourseProgress.id;
      const moduleId = newCourseProgress.moduleId;
      const lessonId = updatedCompletedLesson.id;

      qc.setQueryData(qk.lesson(lessonId), updatedCompletedLesson);
      qc.setQueryData(qk.userCoins(newCoins.id), newCoins);
      qc.setQueryData(qk.streak(newCoins.id), newStreak);
      qc.setQueryData(qk.xp(newXp.id), newXp);
      qc.invalidateQueries({ queryKey: qk.streakPastWeek() });
      qc.invalidateQueries({ queryKey: qk.courseProgress(courseId) });
      qc.invalidateQueries({ queryKey: qk.courseStats(newCourseProgress.id) });
      qc.invalidateQueries({queryKey: qk.xpHistory()})

      const { coins } = newCoins;
      const { current } = newStreak;

      router.navigate(
        ludoNavigation.completion.toLessonComplete(
          courseId,
          moduleId,
          lessonId,
          coins,
          accuracy,
          xpGained,
          oldStreak,
          current,
          completionStatus,
        ),
      );
    },
  });
}
