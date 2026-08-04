import { SHOWCASE_CDN_BASE_URL } from "@/constants/environment/env.ts";

export const showcaseVideoUrl = (fileName: string) =>
  `${SHOWCASE_CDN_BASE_URL}/${fileName}`;

export const LANDING_SHOWCASE_VIDEO = showcaseVideoUrl("ludoshowcase.mp4");
export const CREATE_COURSE_SHOWCASE_VIDEO = showcaseVideoUrl(
  "create-course-showcase-video.mp4",
);
