import { useGoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { qk } from "../Definitions/qk.ts";
import { ludoNavigation } from "@/old-routes/navigator/ludoNavigation.tsx";
import { qo } from "../Definitions/queries.ts";
import { useRouter } from "@tanstack/react-router";
import { googleLoginFn } from "@/routes/_app/route.tsx";
export function useGoogleAuthEntry() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);

      console.log("Calling post");

      const { user, userCoins, userStreak } = await googleLoginFn({
        data: { code: codeResponse.code },
      });
      await router.invalidate();

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
