import { redirectToAuth } from "@/routes/redirects/redirects";
import { mutations } from "../Definitions/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogout() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.logOut(),
    onSuccess: () => {
      qc.clear();
      redirectToAuth()
    },
  });
}