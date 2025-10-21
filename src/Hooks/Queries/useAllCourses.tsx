import { useQuery } from "@tanstack/react-query";
import { qk } from "../../constants/qk";
import type { LudoCourse } from "../../Types/Catalog/LudoCourse";
import { GET_ALL_COURSES } from "../../constants/apiPaths";

export function useAllCourses() {
    return useQuery({
        queryKey: qk.courses(),
        queryFn: () => fetchAllCourses(),
        staleTime: 60_000,
    })
}

export async function fetchAllCourses(): Promise<LudoCourse[]> {
    const res = await fetch(GET_ALL_COURSES)
    if (!res.ok) throw new Error("Failed to fetch all courses");
    return (await res.json()) as LudoCourse[]
}