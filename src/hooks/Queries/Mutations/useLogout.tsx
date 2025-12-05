import { mutations } from "../Definitions/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "@/routes/router";
import { ludoNavigation } from "@/routes/navigator/ludoNavigation";

export function useLogout() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.logOut(),
    onSuccess: () => {
      qc.clear();
      router.navigate(ludoNavigation.auth());
    },
  });
}
