import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_hub/leaderboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="layout-grid col-span-full scrollable py-6 px-8 lg:px-0">
        <div className="col-span-1" />
        <div className="col-span-10 flex flex-col items-center justify-center text-center gap-8 py-20">
          <div className="flex flex-col gap-3 items-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              Coming soon!
            </h1>

            <p className="text-sm lg:text-base text-ludo-accent-muted max-w-md">

            </p>
          </div>
        </div>
        <div className="col-span-1" />
      </div>
    </>
  );
}
