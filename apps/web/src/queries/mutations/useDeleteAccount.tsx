import { mutations } from "@/queries/definitions/mutations.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { useRouter } from "@tanstack/react-router";

export function useDeleteAccount() {
  const router = useRouter();
  const qc = useQueryClient();

  return useMutation({
    ...mutations.deleteAccount(),
    onSuccess: async () => {
      await router.navigate(ludoNavigation.auth.login());
      qc.clear();
    },
  });
}