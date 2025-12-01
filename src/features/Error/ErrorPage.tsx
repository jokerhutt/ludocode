import { Button } from "@/components/ui/button";
import { errorMap, type ErrorStatus } from "@/constants/static-data/ErrorData";
import { FallbackLayout } from "@/Layouts/Fallback/FallbackLayout";

type ErrorPageProps = { errorCode: ErrorStatus };

export function ErrorPage({ errorCode }: ErrorPageProps) {
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

        <Button onClick={() => fallbackAction?.()}>{actionText}</Button>
      </div>
    </FallbackLayout>
  );
}
