export async function ludoGet<T>(
  path: string,
  credentials: boolean = false,
  name: string = ""
): Promise<T> {

  const res = await fetch(path, {
    credentials: credentials ? "include" : "same-origin",
  });

  if (!res.ok) throw new Error("Failed to fetch " + name);
  return res.json() as Promise<T>;
}
