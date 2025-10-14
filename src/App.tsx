import { RouterProvider } from "@tanstack/react-router";
import "./App.css";
import { TutorialPage } from "./features/Tutorial/TutorialPage";
import { router } from "./routes/router";

function App() {
  return (
    <div className="w-dvw h-dvh [scrollbar-gutter:stable_right]  overflow-auto scrollbar-ludoYellow  bg-ludoGrayDark">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
