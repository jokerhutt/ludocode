import { useGoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { GOOGLE_LOGIN } from "@/constants/api/pathConstants.ts";
import { qk } from "@/hooks/Queries/Definitions/qk.ts";
import type { LoginUserResponse } from "@ludocode/types/User/LoginUserResponse.ts";
import { ludoPost } from "@/hooks/Queries/Fetcher/ludoPost.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useRouter } from "@tanstack/react-router";
export function useGoogleAuthEntry() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);

      const { user, userCoins, userStreak }: LoginUserResponse = await ludoPost(
        GOOGLE_LOGIN,
        { code: codeResponse.code },
        true
      );

      queryClient.setQueryData(qk.user(user.id), user);
      queryClient.setQueryData(qk.currentUser(), user);
      queryClient.setQueryData(qk.userCoins(user.id), userCoins);
      queryClient.setQueryData(qk.streak(user.id), userStreak);

      if (!user.hasOnboarded) {
        router.navigate(ludoNavigation.onboarding.start());
      } else {
        const currentCourseId = await queryClient.ensureQueryData(
          qo.currentCourseId()
        );
        const currentCourseProgress = await queryClient.ensureQueryData(
          qo.courseProgress(currentCourseId)
        );
        const { courseId, moduleId } = currentCourseProgress;
        router.navigate(ludoNavigation.hub.module.toModule(courseId, moduleId));
      }
    },
    onError: (err) => console.error("Google login failed", err),
  });
}
