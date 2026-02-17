type SubscriptionComparisonPageProps = {};

export function SubscriptionComparisonPage({}: SubscriptionComparisonPageProps) {
  return (
    <div className="w-full h-full grid grid-cols-12">
        <div className="col-span-1 h-full"/>
            <div className="flex flex-col items-center justify-center col-span-10 h-full">
                <div className="flex w-full justify-center gap-4 items-center">
                    <div className="h-20 w-20 bg-ludo-surface">

                    </div>
                </div>
            </div>
        <div className="col-span-1 h-full"/>
    </div>
  );
}