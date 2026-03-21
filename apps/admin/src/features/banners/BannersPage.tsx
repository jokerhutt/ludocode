import { useCreateBanner } from "@/queries/mutations/useCreateBanner";
import { useDeleteBanner } from "@/queries/mutations/useDeleteBanner";
import { qo } from "@/queries/definitions/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DeleteDialog } from "@ludocode/design-system/templates/dialog/delete-dialog";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LudoInput } from "@ludocode/design-system/primitives/input";
import {
  LudoSelect,
  LudoSelectItem,
} from "@ludocode/design-system/primitives/select";
import { Input } from "@ludocode/external/ui/input";
import type { BannerType, LudoBannerSnapshot } from "@ludocode/types";
import { Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

const BANNER_TYPES: BannerType[] = ["MAINTENANCE", "FEATURE", "INCIDENT"];

const typeClassMap: Record<
  BannerType,
  { badge: string; card: string; dot: string }
> = {
  MAINTENANCE: {
    badge: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    card: "border-amber-500/30",
    dot: "bg-amber-400",
  },
  FEATURE: {
    badge: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    card: "border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  INCIDENT: {
    badge: "bg-red-500/15 text-red-300 border border-red-500/30",
    card: "border-red-500/30",
    dot: "bg-red-400",
  },
};

function normalizeBanners(raw: unknown): LudoBannerSnapshot[] {
  if (Array.isArray(raw)) {
    return raw as LudoBannerSnapshot[];
  }

  if (raw && typeof raw === "object") {
    const maybe = raw as { banners?: unknown; data?: unknown };
    if (Array.isArray(maybe.banners)) {
      return maybe.banners as LudoBannerSnapshot[];
    }
    if (Array.isArray(maybe.data)) {
      return maybe.data as LudoBannerSnapshot[];
    }
    if ("id" in (raw as object) && "type" in (raw as object)) {
      return [raw as LudoBannerSnapshot];
    }
  }

  return [];
}

function toIsoOrUndefined(value: string): string | undefined {
  if (!value.trim()) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString();
}

function formatDate(value: number | string | undefined) {
  if (!value && value !== 0) return "No expiry";

  const raw = typeof value === "number" ? value : Date.parse(String(value));
  const timestamp = raw < 10_000_000_000 ? raw * 1000 : raw;
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) return "No expiry";

  return date.toLocaleString();
}

function DeleteBannerButton({
  banner,
  disabled,
}: {
  banner: LudoBannerSnapshot;
  disabled: boolean;
}) {
  const deleteMutation = useDeleteBanner({ bannerId: banner.id });

  return (
    <DeleteDialog
      targetName={`${banner.type.toLowerCase()} banner #${banner.id}`}
      triggerClassName="w-auto"
      asChild
      onClick={() => {
        if (!deleteMutation.isPending && !disabled) {
          deleteMutation.mutate();
        }
      }}
    >
      <button
        type="button"
        disabled={disabled || deleteMutation.isPending}
        className="h-8 w-8 rounded-md border border-red-500/40 bg-transparent text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50 inline-flex items-center justify-center"
        aria-label={`Delete banner ${banner.id}`}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </DeleteDialog>
  );
}

type BannerColumnProps = {
  title: string;
  banners: LudoBannerSnapshot[];
  emptyText: string;
  showDelete?: boolean;
};

function BannerColumn({
  title,
  banners,
  emptyText,
  showDelete = true,
}: BannerColumnProps) {
  return (
    <div className="rounded-xl border border-ludo-accent-muted/30 bg-ludo-surface/30 p-4 md:p-5 min-h-64">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-ludo-white-bright text-lg font-semibold">
          {title}
        </h3>
        <span className="text-xs text-ludo-white-dim">
          {banners.length} total
        </span>
      </div>

      {banners.length === 0 && (
        <div className="h-44 rounded-lg border border-dashed border-ludo-accent-muted/40 flex items-center justify-center text-ludo-white-dim text-sm">
          {emptyText}
        </div>
      )}

      <div className="space-y-3">
        {banners.map((banner) => {
          const tone = typeClassMap[banner.type];

          return (
            <div
              key={banner.id}
              className={`rounded-lg border bg-ludo-background/70 p-3 ${tone.card}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ${tone.badge}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${tone.dot}`}
                      />
                      {banner.type}
                    </span>
                    <span className="text-xs text-ludo-white-dim">
                      ID #{banner.id}
                    </span>
                  </div>

                  <p className="text-sm text-ludo-white whitespace-pre-wrap wrap-break-word">
                    {banner.text}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ludo-white-dim">
                    <span>Created: {formatDate(banner.createdAt)}</span>
                    <span>Expires: {formatDate(banner.expiresAt)}</span>
                  </div>
                </div>

                {showDelete && (
                  <DeleteBannerButton banner={banner} disabled={false} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function BannersPage() {
  const { data } = useSuspenseQuery(qo.banners());
  const createMutation = useCreateBanner();

  const [type, setType] = useState<BannerType>("FEATURE");
  const [text, setText] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [error, setError] = useState<string | null>(null);

  const banners = useMemo(() => normalizeBanners(data), [data]);

  const activeBanners = useMemo(
    () => banners.filter((banner) => banner.isActive),
    [banners],
  );

  const inactiveBanners = useMemo(
    () => banners.filter((banner) => !banner.isActive),
    [banners],
  );

  const hasActiveType = activeBanners.some((banner) => banner.type === type);

  const handleCreate = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Banner text is required.");
      return;
    }

    if (hasActiveType) {
      setError(`There is already an active ${type.toLowerCase()} banner.`);
      return;
    }

    const expiresAtIso = toIsoOrUndefined(expiresAt);
    if (expiresAt && !expiresAtIso) {
      setError("Please provide a valid expiry date/time.");
      return;
    }

    setError(null);

    createMutation.mutate(
      {
        type,
        text: trimmed,
        expiresAt: expiresAtIso,
      },
      {
        onSuccess: () => {
          setText("");
          setExpiresAt("");
        },
      },
    );
  };

  return (
    <div className="layout-grid col-span-full scrollable py-10 px-6 lg:px-0">
      <div className="col-span-1 lg:bg-ludo-background" />

      <div className="col-span-10 flex flex-col gap-8 min-w-0">
        <header className="rounded-xl border border-ludo-accent-muted/35 bg-ludo-surface/30 p-6 md:p-7">
          <h1 className="text-ludo-white-bright text-3xl font-bold">Banners</h1>
          <p className="mt-2 text-ludo-white-dim text-sm md:text-base">
            Create timed platform notices and manage lifecycle by deleting old
            entries. Active banners are unique per type.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <LudoSelect
              title="Type"
              variant="dark"
              value={type}
              setValue={(next) => setType(next as BannerType)}
              containerClassName="md:col-span-3"
            >
              {BANNER_TYPES.map((bannerType) => (
                <LudoSelectItem key={bannerType} value={bannerType}>
                  {bannerType}
                </LudoSelectItem>
              ))}
            </LudoSelect>

            <LudoInput
              containerClassName="md:col-span-5"
              title="Text"
              variant="dark"
              value={text}
              setValue={setText}
              placeholder="Planned maintenance at 02:00 UTC"
            />

            <div className="md:col-span-2 w-full text-ludo-white flex flex-col gap-2">
              <p className="text-sm">Expires At (optional)</p>
              <Input
                type="datetime-local"
                value={expiresAt}
                onChange={(event) => setExpiresAt(event.target.value)}
                className="h-12 bg-ludo-background border border-transparent text-ludo-white-bright"
              />
            </div>

            <div className="md:col-span-2">
              <LudoButton
                variant="alt"
                disabled={createMutation.isPending || hasActiveType}
                isLoading={createMutation.isPending}
                onClick={handleCreate}
                className="w-full"
              >
                Create Banner
              </LudoButton>
            </div>
          </div>

          {hasActiveType && (
            <p className="mt-3 text-xs text-amber-300">
              Active {type.toLowerCase()} banner already exists. Delete it first
              to create another.
            </p>
          )}

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <BannerColumn
            title="Active"
            banners={activeBanners}
            emptyText="No active banners"
          />
          <BannerColumn
            title="Inactive"
            banners={inactiveBanners}
            emptyText="No inactive banners"
            showDelete={false}
          />
        </div>
      </div>

      <div className="col-span-1 lg:bg-ludo-background" />
    </div>
  );
}
