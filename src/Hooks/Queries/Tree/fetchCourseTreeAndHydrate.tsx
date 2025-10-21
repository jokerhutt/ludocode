import type { QueryClient } from "@tanstack/react-query";
import { fetchCourseTree } from "./fetchCourseTree";
import type { CourseTree } from "../../../Types/Catalog/CourseTree";
import { qk } from "../../../constants/qk";


export async function fetchCourseTreeAndHydrate(qc: QueryClient, courseId: string) {

    const tree: CourseTree = await fetchCourseTree(courseId)

    qc.setQueryData(qk.course(courseId), tree.course)

    const modules = tree.modules
    .map((moduleNode) => moduleNode.module)
    .sort((a, b) => a.orderIndex - b.orderIndex)

    qc.setQueryData(qk.modulesBySection(courseId), modules)

    for (const moduleNode of tree.modules) {
        qc.setQueryData(qk.module(moduleNode.module.id), moduleNode.module)

        const lessons = [...moduleNode.lessons].sort(
            (a, b) => a.orderIndex - b.orderIndex
        )

        qc.setQueryData(qk.lessonsByModule(moduleNode.module.id), lessons)

        for (const lesson of lessons) {
            qc.setQueryData(qk.lesson(lesson.id), lesson)
        }

    }

    console.log(JSON.stringify("TREE IS: " + tree))

    




}