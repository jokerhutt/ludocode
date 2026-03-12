export type AnalyticsEventKey =
  | "SIGNUP_CLICK"
  | "DOCS_CLICK"
  | "LANDING_PAGE_VIEW";

export type AnalyticsEvent = {
  event: AnalyticsEventKey;
  properties?: Record<string, unknown>;
};
