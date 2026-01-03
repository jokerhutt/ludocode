import { mutationOptions } from "@tanstack/react-query";
import { ludoPost } from "@/hooks/Queries/Fetcher/ludoPost.ts";
import { SUBMIT_CREATE_COURSE } from "@/constants/api/pathConstants.ts";
import { type LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import { type CreateCourseRequest } from "@ludocode/types/Builder/CreateCourseRequest.ts";

export const mutations = {
  createCourse: () => {
    return mutationOptions<LudoCourse[], Error, CreateCourseRequest>({
      mutationKey: ["createCourse"],
      mutationFn: (variables) =>
        ludoPost<LudoCourse[], CreateCourseRequest>(
          SUBMIT_CREATE_COURSE,
          variables,
          true
        ),
    });
  },
};
