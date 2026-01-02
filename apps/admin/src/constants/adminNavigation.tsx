export const adminNavigation = {
  auth: () => ({ to: authRoute.to }),
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
      lessonId: string
    ) => ({
      to: builderPageRoute.to,
      params: { courseId },
      search: { moduleId, lessonId, exerciseId: undefined },
    }),

    toBuilderExercise: (
      courseId: string,
      moduleId: string,
      lessonId: string,
      exerciseId: string
    ) => ({
      to: builderPageRoute.to,
      params: { courseId },
      search: { moduleId, lessonId, exerciseId },
    }),
  },
};
