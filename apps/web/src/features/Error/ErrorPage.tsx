import { Button } from "@ludocode/external/ui/button";
import { errorMap, type ErrorStatus } from "@/constants/content/ErrorData.ts";
import { FallbackLayout } from "@/layouts/Fallback/FallbackLayout.tsx";
import { useRouter } from "@tanstack/react-router";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";

type ErrorPageProps = { errorCode: ErrorStatus };

export function ErrorPage({ errorCode }: ErrorPageProps) {
  const router = useRouter();
  const { status, title, suggestion, actionText, fallbackAction } =
    errorMap[errorCode];

  return (
    <FallbackLayout>
      <div className="w-full h-full grid grid-cols-12">
        <div className="flex flex-col col-span-12 items-center justify-center text-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <span className="text-7xl lg:text-8xl font-bold text-ludoAltText/20 tracking-widest">
              {status}
            </span>

            <div className="w-12 h-[2px] bg-ludo-accent/40 rounded-full" />
          </div>

          <div className="flex flex-col gap-3 max-w-md">
            <h1 className="text-xl lg:text-2xl font-semibold text-white">
              {title}
            </h1>
            <p className="text-sm lg:text-base text-ludo-accent-muted">
              {suggestion}
            </p>
          </div>

          {fallbackAction && (
            <div className="flex gap-4">
              <LudoButton
                className="w-auto px-4"
                variant="white"
                onClick={() => {
                  const nav = fallbackAction();
                  if (nav) router.navigate(nav);
                }}
              >
                {actionText}
              </LudoButton>
            </div>
          )}
        </div>
      </div>
    </FallbackLayout>
  );
}
