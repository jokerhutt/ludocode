import { useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../constants/qk";
import type { CourseProgress } from "../../Types/Progress/CourseProgress";
import { GET_COURSE_PROGRESS } from "../../constants/apiPaths";

export function useCourseProgress(courseId: string) {

    return useQuery({
        queryKey: qk.courseProgress(courseId),
        queryFn: () => fetchCourseProgress(courseId),
        staleTime: 60_000
    })

}

export async function fetchCourseProgress(courseId: string): Promise<CourseProgress> {
    const res = await fetch(GET_COURSE_PROGRESS(courseId), {credentials: "include"})
    if (!res.ok) throw new Error("Failed to get course progress");
    return (await res.json()) as CourseProgress
}