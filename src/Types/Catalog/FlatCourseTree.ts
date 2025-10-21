export type FlatCourseTree = {
  courseId: string;
  modules: FlatModule[];
};

export type FlatModule = {
  id: string;
  orderIndex: number;
  lessons: FlatLesson[];
};

export type FlatLesson = {
  id: string;
  orderIndex: number;
};
