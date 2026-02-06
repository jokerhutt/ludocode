import { mutationOptions } from "@tanstack/react-query";
import { type LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import { type CreateCourseRequest } from "@ludocode/types/Builder/CreateCourseRequest.ts";
import { ludoPost } from "@ludocode/api/fetcher";
import { adminApi } from "@/constants/api/adminApi";
import type { LanguageMetadata, CreateLanguageRequest } from "@ludocode/types";

export const mutations = {
  createCourse: () => {
    return mutationOptions<LudoCourse[], Error, CreateCourseRequest>({
      mutationKey: ["createCourse"],
      mutationFn: (variables) =>
        ludoPost<LudoCourse[], CreateCourseRequest>(
          adminApi.snapshots.course,
          variables,
          true,
        ),
    });
  },
  createLanguage: () => {
    return mutationOptions<LanguageMetadata[], Error, CreateLanguageRequest>({
      mutationKey: ["createLanguage"],
      mutationFn: (variables) =>
        ludoPost<LanguageMetadata[], CreateLanguageRequest>(
          adminApi.languages.base,
          variables,
          true,
        ),
    });
  },
};
