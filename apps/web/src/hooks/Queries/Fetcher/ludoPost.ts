import { LOGOUT } from "@/constants/api/pathConstants.ts";

export async function ludoPost<TResponse, TBody = unknown>(
  path: string,
  body: TBody | null,
  credentials = false
): Promise<TResponse> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: credentials ? "include" : "same-origin",
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`Failed POST ${path} → ${res.status}`);
  
  return res.json() as Promise<TResponse>;
}

export async function logout() {
  const res = await fetch(LOGOUT, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error(`Logout failed → ${res.status}`);
}