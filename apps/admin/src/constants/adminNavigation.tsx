// AUTH
import { Route as authRoute } from "@/routes/auth";
import { Route as builderHubRoute } from "@/routes/_app/_hub/builder.tsx";
import { Route as builderPageRoute } from "@/routes/_app/build/$courseId.tsx";
import { Route as languagesHubRoute } from "@/routes/_app/_hub/languages.tsx";
import { Route as modifyLanguagePageRoute } from "@/routes/_app/language/$languageId";
import { Route as createLanguagePageRoute } from "@/routes/_app/language/create";
export const adminNavigation = {
  auth: () => ({ to: authRoute.to }),
  hub: {
    builder: {
      toBuilderHub: () => ({
        to: builderHubRoute.to,
      }),
    },
    languages: {
      toLanguagesHub: () => ({
        to: languagesHubRoute.to,
      }),
    },
  },
  language: {
    toLanguage: (languageId: number) => ({
      to: modifyLanguagePageRoute.to,
      params: { languageId: String(languageId) },
    }),
    toCreateLanguage: () => ({
      to: createLanguagePageRoute.to,
    }),
  },
  builder: {
    toBuilderHub: () => ({
      to: builderHubRoute.to,
    }),
    toBuilder: (courseId: string) => ({
      to: builderPageRoute.to,
      params: {
        courseId,
      },
      search: {
        moduleId: undefined,
        lessonId: undefined,
        exerciseId: undefined,
      },
    }),

    toBuilderModule: (courseId: string, moduleId: string) => ({
      to: builderPageRoute.to,
      params: { courseId },
      search: { moduleId, lessonId: undefined, exerciseId: undefined },
    }),

    toBuilderLesson: (
      courseId: string,
      moduleId: string,
      lessonId: string,
    ) => ({
      to: builderPageRoute.to,
      params: { courseId },
      search: { moduleId, lessonId, exerciseId: undefined },
    }),

    toBuilderExercise: (
      courseId: string,
      moduleId: string,
      lessonId: string,
      exerciseId: string,
    ) => ({
      to: builderPageRoute.to,
      params: { courseId },
      search: { moduleId, lessonId, exerciseId },
    }),
  },
};
