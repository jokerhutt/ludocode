export async function ludoGet<T>(
  path: string,
  credentials: boolean = true,
  name = ""
): Promise<T> {
  const res = await fetch(path, {
    credentials: credentials ? "include" : "same-origin",
  });

  if (!res.ok) throw new Error("Failed to fetch " + name);
  return res.json() as Promise<T>;
}

export async function ludoPost<TResponse, TBody = unknown>(
  path: string,
  body: TBody | null,
  credentials = false,
  headers?: Record<string, string>
): Promise<TResponse> {
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: credentials ? "include" : "same-origin",
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`Failed POST ${path} → ${res.status}`);

  if (res.status === 204) {
    return undefined as TResponse;
  }

  return res.json() as Promise<TResponse>;
}

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

export async function ludoPut<TResponse, TBody = unknown>(
  path: string,
  body: TBody | null,
  credentials = false,
  headers?: Record<string, string>
): Promise<TResponse> {
  const res = await fetch(path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: credentials ? "include" : "same-origin",
    body: body !== null ? JSON.stringify(body) : null,
  });

  if (!res.ok) throw new Error(`Failed PUT ${path} → ${res.status}`);

  if (res.status === 204) {
    return undefined as TResponse;
  }

  return res.json() as Promise<TResponse>;
}

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
