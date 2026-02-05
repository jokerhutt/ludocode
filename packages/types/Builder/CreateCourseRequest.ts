import { CourseType } from "../Catalog/LudoCourse";

export type CreateCourseRequest = {
  courseTitle: string;
  requestHash: string;
  courseType: CourseType;
  courseSubject: CreateCourseSubjectRequest;
};

export type CreateCourseSubjectRequest = {
  slug: string;
  name: string;
  codeLanguageId: number;
};
