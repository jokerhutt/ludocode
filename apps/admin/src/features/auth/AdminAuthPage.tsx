import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper";
import { MainContentWrapper } from "@ludocode/design-system/layouts/grid/main-content-wrapper";
import { useAdminFirebaseAuthEntry } from "@/hooks/Queries/Mutations/useAdminFirebaseAuthEntry";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { GoogleIcon } from "@ludocode/design-system/primitives/custom-icon";

export function AdminAuthPage() {
  const firebaseLogin = useAdminFirebaseAuthEntry();

  return (
    <MainGridWrapper gridRows="ONE">
      <MainContentWrapper>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col gap-12 w-4/5 lg:w-1/2 items-center justify-center">
            <h1 className="text-center text-3xl lg:text-6xl text-ludo-white">
              Welcome to Ludocode Admin
            </h1>

            <p className="text-ludo-white text-center text-xl">
              This is the admin dashboard for ludocode
            </p>

            <div className="border border-ludo-background p-6 flex justify-center items-center flex-col w-full">
              <LudoButton
                className="font-bold"
                variant="white"
                onClick={() => firebaseLogin("GOOGLE")}
              >
                <GoogleIcon />
                Google
              </LudoButton>
            </div>
          </div>
        </div>
      </MainContentWrapper>
    </MainGridWrapper>
  );
}
