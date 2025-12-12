// src/server/auth.ts
import { createServerFn } from "@tanstack/react-start";
import { AUTH_ME } from "@/constants/api/pathConstants";
import { getRequestHeaders } from "@tanstack/react-start/server";
import type { LudoUser } from "@/types/User/LudoUser";
import { useAppSession } from "./session";

export async function resolveUser() {
  const session = await useAppSession();
  return session.data;
}

export async function fetchCurrentUserFromCookie(
  cookie: string
): Promise<LudoUser | null> {
  const res = await fetch(AUTH_ME, { headers: { cookie } });
  if (!res.ok) return null;
  return res.json();
}

export const getCurrentUser = createServerFn({ method: "GET" }).handler(
  async () => {
    const cookie = getRequestHeaders().get("cookie") ?? "";
    return fetchCurrentUserFromCookie(cookie);
  }
);
