import { Button } from "../../../../../packages/external/ui/button.tsx";
import { errorMap, type ErrorStatus } from "@/constants/content/ErrorData.ts";
import { FallbackLayout } from "@/layouts/Fallback/FallbackLayout.tsx";
import { useRouter } from "@tanstack/react-router";

type ErrorPageProps = { errorCode: ErrorStatus };

export function ErrorPage({ errorCode }: ErrorPageProps) {
  const router = useRouter();
  const { status, title, suggestion, actionText, fallbackAction } =
    errorMap[errorCode];

  return (
    <FallbackLayout>
      <h1 className="text-center text-6xl text-ludoAltText">{status}</h1>
      <div className="p-6 text-center flex flex-col gap-6 rounded-lg bg-ludoGrayLight/70">
        <div className="flex flex-col gap-2">
          <p className="text-ludoAltText">{title}</p>
          <p className="text-ludoAltText">{suggestion}</p>
        </div>

        {fallbackAction && (
          <Button
            onClick={() => {
              const nav = fallbackAction?.();
              if (nav) router.navigate(nav);
            }}
          >
            {actionText}
          </Button>
        )}
      </div>
    </FallbackLayout>
  );
}
