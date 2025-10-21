import { useQuery } from "@tanstack/react-query";
import { qk } from "../../../constants/qk";
import { GET_COURSE_TREE } from "../../../constants/apiPaths";


export function useFlatTree(courseId: string) {

    return useQuery({
        queryKey: qk.courseTree(courseId),
        queryFn: () => fetchFlatTree(courseId)
    })

}

export async function fetchFlatTree(courseId: string) {

    const res = await fetch(GET_COURSE_TREE(courseId))
    if (!res.ok) throw new Error("No course tree");
    const tree = await res.json();
    return tree;

}