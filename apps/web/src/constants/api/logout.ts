import { api } from "@/constants/api/api";

export async function logout() {
  const res = await fetch(api.auth.logout, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error(`Logout failed → ${res.status}`);
}
