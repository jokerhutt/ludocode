import { mutationOptions } from "@tanstack/react-query";
import { ludoPost } from "../Fetcher/ludoPost.ts";
import { SUBMIT_CREATE_COURSE } from "../../../constants/api/pathConstants.ts";
import { type LudoCourse } from "../../../../../../packages/types/Catalog/LudoCourse.ts";
import { type CreateCourseRequest } from "../../../../../../packages/types/Builder/CreateCourseRequest.ts";

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
