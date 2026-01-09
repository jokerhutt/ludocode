export async function ludoDelete<TResponse = void>(
  path: string,
  credentials = false,
  headers?: Record<string, string>
): Promise<TResponse> {
  const res = await fetch(path, {
    method: "DELETE",
    headers,
    credentials: credentials ? "include" : "same-origin",
  });

  if (!res.ok) throw new Error(`Failed DELETE ${path} → ${res.status}`);

  if (res.status === 204) {
    return undefined as TResponse;
  }

  return res.json() as Promise<TResponse>;
}
