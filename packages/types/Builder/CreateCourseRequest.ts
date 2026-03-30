import type { CourseType } from "../Catalog/LudoCourse";

export type CreateCourseRequest = {
  courseTitle: string;
  requestHash: string;
  courseType: CourseType;
  courseIcon: string;
  language: string | null;
};
