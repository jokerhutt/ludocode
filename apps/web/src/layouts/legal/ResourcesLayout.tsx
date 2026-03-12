import { router } from "@/main";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper";
import { LudoHeader } from "@ludocode/design-system/zones/ludo-header";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { Outlet } from "@tanstack/react-router";
import { BookOpen, Github, LogIn } from "lucide-react";
import { Suspense } from "react";
import { track } from "@/analytics/track";

const GITHUB_URL = "https://github.com/jokerhutt/ludocode";

function HeaderNavButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-ludo-white-dim hover:text-ludo-white-bright hover:bg-white/5 hover:cursor-pointer transition-all duration-150"
    >
      {children}
    </button>
  );
}

export function ResourcesLayout() {
  const handleLogoClick = () => {
    router.navigate({ to: "/" });
  };

  return (
    <MainGridWrapper gridRows="FULL" className="grid-rows-[auto_1fr]">
      <LudoHeader.Shell>
        <Suspense fallback={<div />}>
          <div className="col-span-full px-6 lg:px-18 hidden lg:flex items-center justify-between">
            <h1
              onClick={() => handleLogoClick()}
              className="text-2xl font-bold "
            >
              <button
                type="button"
                className="hover:cursor-pointer text-ludo-white-bright"
              >
                Ludocode
              </button>
            </h1>
            <div className="flex items-center gap-1">
              <HeaderNavButton
                onClick={() => {
                  track({
                    event: "DOCS_CLICK",
                    properties: { source: "landing_cta_header" },
                  });
                  router.navigate(ludoNavigation.resources.toDocs());
                }}
              >
                <BookOpen className="w-4 h-4" />
                <span>Docs</span>
              </HeaderNavButton>
              <HeaderNavButton
                onClick={() => {
                  track({
                    event: "SOURCE_CODE_CLICK",
                    properties: { source: "landing_cta_header" },
                  });
                  window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
                }}
              >
                <Github className="w-4 h-4" />
                <span>Source</span>
              </HeaderNavButton>
              <div className="w-px h-5 bg-ludo-border mx-2 " />
              <div className="flex items-center  gap-2">
                <HeaderNavButton
                  onClick={() => {
                    track({
                      event: "LOGIN_CLICK",
                      properties: { source: "landing_cta_header" },
                    });
                    router.navigate(ludoNavigation.auth.login(false));
                  }}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Log in</span>
                </HeaderNavButton>
                <LudoButton
                  variant="alt"
                  shadow={false}
                  className="h-8 w-auto px-4 text-sm font-medium"
                  onClick={() => {
                    track({
                      event: "SIGNUP_CLICK",
                      properties: { source: "landing_cta_header" },
                    });
                    router.navigate(ludoNavigation.auth.register(false));
                  }}
                >
                  Register
                </LudoButton>
              </div>
            </div>
          </div>

          <div className="col-span-full px-6 flex lg:hidden items-center justify-between">
            <h1
              onClick={() => handleLogoClick()}
              className="text-2xl font-bold hover:cursor-pointer text-ludo-white-bright"
            >
              Ludocode
            </h1>
            <HeaderNavButton
              onClick={() => router.navigate(ludoNavigation.resources.toDocs())}
            >
              <BookOpen className="w-4 h-4" />
              <span>Docs</span>
            </HeaderNavButton>
          </div>
        </Suspense>
      </LudoHeader.Shell>
      <Suspense fallback={<div className="col-span-full" />}>
        <div className="col-span-full min-h-0 overflow-y-auto">
          <Outlet />
        </div>
      </Suspense>
    </MainGridWrapper>
  );
}
