import { api } from "@/constants/api/api";
import type { AnalyticsEvent } from "./events";

export async function track(event: AnalyticsEvent) {
  if (localStorage.getItem("disable_analytics") === "true") return;
  try {
    await fetch(api.analytics.base, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
      keepalive: true,
    });
  } catch {}
}
