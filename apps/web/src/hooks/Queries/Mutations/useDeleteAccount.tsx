import { mutations } from "@/hooks/Queries/Definitions/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ludoNavigation } from "@/constants/ludoNavigation";
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