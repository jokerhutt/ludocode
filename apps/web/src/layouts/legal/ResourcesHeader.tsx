import { track } from "@/analytics/track";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { router } from "@/main";
import { useFirebaseAuthEntry } from "@/queries/mutations/authMutations";
import { GoogleIcon } from "@ludocode/design-system/primitives/custom-icon";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { NavButton } from "@ludocode/design-system/primitives/NavButton.tsx";
import { BookOpen, Github, LogIn } from "lucide-react";

const GITHUB_URL = "https://github.com/jokerhutt/ludocode";
const HEADER_SOURCE = "landing_cta_header";

export function ResourcesHeader() {
  const firebaseLogin = useFirebaseAuthEntry();

  const goHome = () => {
    router.navigate({ to: "/" });
  };

  const goToDocs = () => {
    track({ event: "DOCS_CLICK", properties: { source: HEADER_SOURCE } });
    router.navigate(ludoNavigation.resources.toDocs());
  };

  const openSource = () => {
    track({
      event: "SOURCE_CODE_CLICK",
      properties: { source: HEADER_SOURCE },
    });
    window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
  };

  const goToLogin = () => {
    track({ event: "LOGIN_CLICK", properties: { source: HEADER_SOURCE } });
    router.navigate(ludoNavigation.auth.login(false));
  };

  const goToRegister = () => {
    track({ event: "SIGNUP_CLICK", properties: { source: HEADER_SOURCE } });
    router.navigate(ludoNavigation.auth.register(false));
  };

  const joinWithGoogle = () => {
    track({
      event: "SIGNUP_CLICK",
      properties: { source: "resources_header", provider: "GOOGLE" },
    });
    void firebaseLogin("GOOGLE");
  };

  return (
    <div className="col-span-full px-6 lg:px-18 flex items-center justify-between">
      <h1 className="text-2xl font-bold">
        <button
          type="button"
          onClick={goHome}
          className="hover:cursor-pointer text-ludo-white-bright"
        >
          Ludocode
        </button>
      </h1>

      <div className="flex items-center gap-3 lg:gap-1">
        <NavButton className="flex flex-row gap-2" onClick={goToDocs}>
          <BookOpen className="w-4 h-4" />
          <span>Docs</span>
        </NavButton>

        <NavButton className="hidden lg:flex" onClick={openSource}>
          <Github className="w-4 h-4" />
          <span>Source</span>
        </NavButton>

        <div className="hidden lg:block w-px h-5 bg-ludo-border mx-2" />

        <div className="flex items-center gap-2">
          <LudoButton
            variant="alt"
            shadow={false}
            className="hidden lg:flex h-8 w-auto px-4 text-sm font-medium"
            onClick={goToLogin}
          >
            <LogIn className="w-4 h-4" />
            <span>Log in</span>
          </LudoButton>

          <LudoButton
            variant="alt"
            shadow={false}
            className="hidden lg:flex h-8 w-auto px-4 text-sm font-medium"
            onClick={goToRegister}
          >
            Register
          </LudoButton>

          <NavButton
            onClick={joinWithGoogle}
            className="h-7 lg:h-8 px-3 py-0 flex flex-row rounded-md lg:rounded-lg justify-center bg-ludo-white text-black hover:text-ludo-white-bright hover:bg-transparent"
          >
            <GoogleIcon />
            <span className="lg:hidden">Join</span>
            <span className="hidden lg:inline">Google</span>
          </NavButton>
        </div>
      </div>
    </div>
  );
}
