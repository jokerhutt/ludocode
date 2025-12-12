import type { LudoUser } from "@/types/User/LudoUser";
import { useSession } from "@tanstack/react-start/server";

export function useAppSession() {
  return useSession<LudoUser>({
    name: "app-session",
    password: process.env.SESSION_SECRET!,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    },
  });
}
