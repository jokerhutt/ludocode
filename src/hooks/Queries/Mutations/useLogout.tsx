import { mutations } from "../Definitions/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ludoNavigation } from "@/routes/utils/-ludoNavigation.tsx";
import { useRouter } from "@tanstack/react-router";

export function useLogout() {
  const router = useRouter()
  const qc = useQueryClient();

  return useMutation({
    ...mutations.logOut(),
    onSuccess: () => {
      qc.clear();
      router.navigate(ludoNavigation.auth());
    },
  });
}
