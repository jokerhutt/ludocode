import { createApiPaths } from "@ludocode/api/api-paths";

export const api = createApiPaths({
  apiUrl: import.meta.env.VITE_API_URL,
  apiPrefix: "/api/v1",
    adminPrefix: "/admin",
});
