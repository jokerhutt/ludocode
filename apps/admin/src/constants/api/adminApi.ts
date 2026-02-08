import { createApiPaths } from "@ludocode/api/api-paths";

export const adminApi = createApiPaths({
  apiUrl: import.meta.env.VITE_API_URL,
  apiPrefix: "/api/v1",
  adminPrefix: "/admin",
  demoAuthToken: import.meta.env.VITE_DEMO_AUTH_TOKEN,
});
