import { mutationOptions } from "@tanstack/react-query";
import { type LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import { type CreateCourseRequest } from "@ludocode/types/Builder/CreateCourseRequest.ts";
import { ludoDelete, ludoPost, ludoPut } from "@ludocode/api/fetcher";
import { adminApi } from "@/constants/api/adminApi";
import {
  type LanguageMetadata,
  type ModifyLanguageRequest,
} from "@ludocode/types";

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
  updateLanguage: (languageId: number) => {
    return mutationOptions<LanguageMetadata[], Error, ModifyLanguageRequest>({
      mutationKey: ["updateLanguage"],
      mutationFn: (variables) =>
        ludoPut<LanguageMetadata[], ModifyLanguageRequest>(
          adminApi.languages.byAdminId(languageId),
          variables,
          true,
        ),
    });
  },
  deleteLanguage: (languageId: number) => {
    return mutationOptions<LanguageMetadata[], Error, void>({
      mutationKey: ["deleteLanguage"],
      mutationFn: () =>
        ludoDelete<LanguageMetadata[]>(
          adminApi.languages.byAdminId(languageId),
          true,
        ),
    });
  },
  createLanguage: () => {
    return mutationOptions<LanguageMetadata[], Error, ModifyLanguageRequest>({
      mutationKey: ["createLanguage"],
      mutationFn: (variables) =>
        ludoPost<LanguageMetadata[], ModifyLanguageRequest>(
          adminApi.languages.adminBase,
          variables,
          true,
        ),
    });
  },
};
