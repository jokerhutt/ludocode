import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/queries/definitions/qk.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { mutations } from "@/queries/definitions/mutations.ts";
import { useRouter } from "@tanstack/react-router";
import type { LudoUser } from "@ludocode/types";

export function useChangeAvatar(userId: string) {
  const qc = useQueryClient();
  const router = useRouter();

  return useMutation({
    ...mutations.changeAvatar(),
    onSuccess: (payload: LudoUser) => {
      qc.setQueryData(
        qk.currentUser(),
        payload
      );
      router.navigate(ludoNavigation.hub.profile.toProfile(userId));
    },
  });
}