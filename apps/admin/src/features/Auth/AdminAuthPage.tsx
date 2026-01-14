import { Button } from "@ludocode/external/ui/button";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper";
import { MainContentWrapper } from "@ludocode/design-system/layouts/grid/main-content-wrapper";
import { useAdminFirebaseAuthEntry } from "@/hooks/Queries/Mutations/useAdminFirebaseAuthEntry";

export function AdminAuthPage() {
  const firebaseLogin = useAdminFirebaseAuthEntry();

  return (
    <MainGridWrapper gridRows="ONE">
      <MainContentWrapper>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col gap-12 w-4/5 lg:w-1/2 items-center justify-center">
            <h1 className="text-center text-3xl lg:text-6xl text-ludoAltText">
              Welcome to Ludocode Admin
            </h1>

            <p className="text-ludoAltText text-center text-xl">
              This is the admin dashboard for ludocode
            </p>

            <div className="border border-ludoGrayLightShadow p-6 flex justify-center items-center flex-col w-full">
              <Button
                onClick={() => firebaseLogin("GOOGLE")}
                className="font-bold h-16 px-6 text-2xl hover:cursor-pointer"
              >
                Sign in with Google
              </Button>
            </div>
          </div>
        </div>
      </MainContentWrapper>
    </MainGridWrapper>
  );
}
