import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper";
import { MainContentWrapper } from "@ludocode/design-system/layouts/grid/main-content-wrapper";
import { useFirebaseAuthEntry } from "@/hooks/Queries/Mutations/useFirebaseAuthEntry";
import { EmailAuthForm } from "../Components/EmailAuthForm";
import { ProviderLoginGroup } from "../Components/ProviderLoginGroup";
import { router } from "@/main";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { useFirebaseEmailAuth } from "@/hooks/Queries/Mutations/useFirebaseEmailAuth";

type AuthPageProps = {};

export function LoginPage({}: AuthPageProps) {
  const firebaseLogin = useFirebaseAuthEntry();
  const emailAuth = useFirebaseEmailAuth();
  return (
    <MainGridWrapper gridRows="ONE">
      <MainContentWrapper>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col gap-4 w-4/5 lg:w-1/3 items-center justify-center">
            <h1 className="text-center text-3xl lg:text-6xl text-ludoAltText">
              Ludocode
            </h1>

            <div className="w-full flex flex-col gap-6">
              <EmailAuthForm
                mode="LOGIN"
                onSubmit={(email, password) =>
                  emailAuth(email, password, "LOGIN")
                }
              />
              <ProviderLoginGroup onLogin={firebaseLogin} />
              <hr className="w-full" />
            </div>

            <div className="w-full flex flex-col gap-0.5 text-sm text-ludoAltText">
              <p>
                Don't have an account yet?{" "}
                <span
                  onClick={() =>
                    router.navigate(ludoNavigation.auth.register())
                  }
                  className="hover:cursor-pointer font-bold underline"
                >
                  Register here
                </span>{" "}
              </p>
              <p>
                Forgot your password?{" "}
                <span className="font-bold underline">Reset your password</span>
              </p>
            </div>
          </div>
        </div>
      </MainContentWrapper>
    </MainGridWrapper>
  );
}
