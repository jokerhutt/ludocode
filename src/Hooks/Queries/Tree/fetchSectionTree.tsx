import { GET_COURSE_TREE, TEST_USER_ID } from "../../../constants/apiPaths";
import type { CourseTree } from "../../../Types/Catalog/CourseTree";
import type { ModuleNode } from "../../../Types/Catalog/ModuleNode";

export async function fetchCourseTree(
    courseId: string
): Promise<CourseTree> {
    const res = await fetch(GET_COURSE_TREE(courseId), { credentials: "include" });
    if (!res.ok) throw new Error(`Failed to fetch course Tree for ${courseId}`);
    return (await res.json()) as CourseTree
}