export async function ludoGet<T>(
  path: string,
  creds: boolean = true,
  name = ""
): Promise<T> {
  const res = await fetch(path, {
    credentials: "include",
  });

  if (!res.ok) {
    console.error("FETCH FAILED", path, res.status);
    throw new Error("Failed to fetch " + name);
  }
  return res.json() as Promise<T>;
}
