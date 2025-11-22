import { RouterProvider } from "@tanstack/react-router";
import "./App.css";
import { queryClient, router } from "./routes/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./constants/env";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <div className="w-dvw h-dvh overflow-auto scrollbar-ludoYellow bg-ludoGrayDark">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

//TODO
//send option UUIDS
//change the update course to /course and progresswithenrolled
