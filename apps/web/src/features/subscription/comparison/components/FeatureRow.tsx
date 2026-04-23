import { XMarkIcon } from "@heroicons/react/24/solid";
import { cn } from "@ludocode/design-system/cn-utils";
import { CheckIcon } from "lucide-react";

export function FeatureRow({
  included,
  label,
}: {
  included: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5 py-1.5">
      {included ? (
        <CheckIcon className="h-4 w-4 shrink-0 text-ludo-success" />
      ) : (
        <XMarkIcon className="h-4 w-4 shrink-0 text-ludo-white-bright/20" />
      )}
      <span
        className={cn(
          "text-sm",
          included ? "text-ludo-white" : "text-ludo-white-disabled",
        )}
      >
        {label}
      </span>
    </div>
  );
}
