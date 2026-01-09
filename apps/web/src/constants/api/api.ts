import { createApiPaths } from "@ludocode/api/api-paths";

export const api = createApiPaths({
  apiUrl: import.meta.env.VITE_API_URL,
  apiPrefix: "/api/v1",
  demoAuthToken: import.meta.env.VITE_DEMO_AUTH_TOKEN,
});
