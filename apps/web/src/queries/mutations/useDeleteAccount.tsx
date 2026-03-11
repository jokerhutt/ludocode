import { mutations } from "@/queries/definitions/mutations.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export function useDeleteAccount() {
  const router = useRouter();
  const qc = useQueryClient();

  return useMutation({
    ...mutations.deleteAccount(),
    onSuccess: async () => {
      qc.clear();
      await router.navigate({ to: "/", replace: true });
    },
  });
}
