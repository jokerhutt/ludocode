import { loginAsGuest } from "@/queries/mutations/guestLogin.ts";
import { errorToast } from "@ludocode/design-system/primitives/toast.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useRef } from "react";

export function useGuestLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const isRunningRef = useRef(false);

  return async () => {
    if (isRunningRef.current) return;

    try {
      isRunningRef.current = true;

      const navigation = await loginAsGuest(queryClient);
      router.navigate(navigation);
    } catch {
      errorToast("Guest login failed. Please try again.");
    } finally {
      isRunningRef.current = false;
    }
  };
}
