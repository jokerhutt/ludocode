import type { QueryClient } from "@tanstack/react-query";
import type { LudoUser } from "@/types/User/LudoUser";
import { qo } from "@/hooks/Queries/Definitions/queries";

export async function coursesLoader (queryClient: QueryClient) {

    const currentUser: LudoUser = await queryClient.ensureQueryData(
      qo.currentUser()
    );
    const allCourses = await queryClient.ensureQueryData(qo.allCourses());
    const enrolled: string[] = await queryClient.ensureQueryData(qo.enrolled());

    await Promise.all(
      enrolled.map((enrolledId) =>
        queryClient.ensureQueryData(qo.courseProgress(enrolledId))
      )
    );

    return { allCourses, enrolled, currentUser };

}