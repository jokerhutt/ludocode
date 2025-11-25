import { useSuspenseQueries, type UseSuspenseQueryOptions } from "@tanstack/react-query";

export function useSuspenseDataArray<T>(
  queries: UseSuspenseQueryOptions<T>[]
): T[] {
  const results = useSuspenseQueries({ queries });
  return results.map((r) => r.data as T);
}