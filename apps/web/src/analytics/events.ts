export type AnalyticsEventKey =
  | "SIGNUP_CLICK"
  | "DOCS_CLICK"
  | "LOGIN_CLICK"
  | "SOURCE_CODE_CLICK"  
  | "NAVIGATION_CLICK"
  | "LESSON_START"  
  | "LESSON_EXIT"  
  | "LANDING_PAGE_VIEW";

export type AnalyticsEvent = {
  event: AnalyticsEventKey;
  properties?: Record<string, unknown>;
};
