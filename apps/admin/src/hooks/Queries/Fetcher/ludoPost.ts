export async function ludoPost<TResponse, TBody = unknown>(
  path: string,
  body: TBody | null,
  credentials = true
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
