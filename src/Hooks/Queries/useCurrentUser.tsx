import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AUTH_ME } from "../../constants/apiPaths";
import { qk } from "../../constants/qk";

export function useCurrentUser() {
  const qc = useQueryClient();

  return useQuery({
    queryKey: qk.currentUser(),
    queryFn: fetchCurrentUser,
    initialData: () => {
      return qc.getQueryData(qk.currentUser());
    },
    staleTime: 60 * 1000,
    retry: false,
  });
}

export async function fetchCurrentUser() {
      const res = await fetch(AUTH_ME, { credentials: "include" });
      if (!res.ok) throw new Error("Not authenticated");
      const user = await res.json();
      return user;
}