import { mutations } from "@/hooks/Queries/Definitions/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { useRouter } from "@tanstack/react-router";

export function useDeleteAccount() {
  const router = useRouter();
  const qc = useQueryClient();

  const logoutMutation = useMutation(mutations.logOut());

  return useMutation({
    ...mutations.deleteAccount(),
    onSuccess: async () => {
      await logoutMutation.mutateAsync();

      qc.clear();
      router.navigate(ludoNavigation.auth.login());
    },
  });
}