import { api } from "@/constants/api/api.ts";
import { finalizeLoginResponse } from "@/queries/mutations/useFinalizeLogin.tsx";
import { ludoPost } from "@ludocode/api/fetcher.ts";
import type { LoginUserResponse } from "@ludocode/types";
import type { QueryClient } from "@tanstack/react-query";

export async function loginAsGuest(queryClient: QueryClient) {
  const loginResponse = await ludoPost<LoginUserResponse>(
    api.auth.guest,
    {},
    true,
  );

  return finalizeLoginResponse(loginResponse, queryClient);
}
