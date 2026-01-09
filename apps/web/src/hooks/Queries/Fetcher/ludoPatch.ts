export async function ludoPatch<TResponse, TBody = unknown>(
  path: string,
  body: TBody | null,
  credentials = false,
  headers?: Record<string, string>
): Promise<TResponse> {
  const res = await fetch(path, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: credentials ? "include" : "same-origin",
    body: body !== null ? JSON.stringify(body) : null,
  });

  if (!res.ok) throw new Error(`Failed PATCH ${path} → ${res.status}`);

  if (res.status === 204) {
    return undefined as TResponse;
  }

  return res.json() as Promise<TResponse>;
}
