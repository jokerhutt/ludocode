import type { LudoUser } from "@/types/User/LudoUser";
import { useSession } from "@tanstack/react-start/server";

export function useAppSession() {
  return useSession<LudoUser>({
    name: "app-session",
    password: "47702bc705c19aa0121d27027e5939532f04c8f1",
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
    },
  });
}
