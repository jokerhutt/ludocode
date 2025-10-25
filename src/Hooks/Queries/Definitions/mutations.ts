import { mutationOptions } from "@tanstack/react-query";
import type { LessonCompletionPacket } from "../../../Types/Exercise/LessonCompletionResponse";
import type { LessonSubmission } from "../../../Types/Exercise/LessonSubmissionTypes";
import { ludoPost } from "../Fetcher/ludoPost";
import { CHANGE_COURSE, SUBMIT_LESSON } from "../../../constants/pathConstants";
import type { ChangeCourseType } from "../../../Types/Request/ChangeCourseType";

export interface ChangeCourseVariables {
  newCourseId: string;
}

export const mutations = {
  submitLesson: (oldStreak: number) => {
    return mutationOptions<LessonCompletionPacket, Error, LessonSubmission>({
      mutationKey: ["submitLesson"],
      mutationFn: (variables) =>
        ludoPost<LessonCompletionPacket, LessonSubmission>(
          SUBMIT_LESSON,
          variables,
          true
        ),
    });
  },

  changeCourse: (newCourseId: string) => {
    return mutationOptions<ChangeCourseType, Error, ChangeCourseVariables>({
        mutationKey: ["changeCourse"],
        mutationFn: (variables) =>
            ludoPost<ChangeCourseType, ChangeCourseVariables>(
                CHANGE_COURSE,
                variables,
                true
            )
    })
  },
};
