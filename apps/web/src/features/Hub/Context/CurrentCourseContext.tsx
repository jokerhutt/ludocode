import type { CourseProgress } from "@ludocode/types/User/CourseProgress";
import { createContext, useContext } from "react";

export const CurrentCourseContext = createContext<CourseProgress | null>(null);

export function useCurrentCourseContext() {
  const ctx = useContext(CurrentCourseContext);
  if (!ctx)
    throw new Error(
      "useCurrentCourseContext must be used inside a Group.Provider"
    );
  return ctx;
}
