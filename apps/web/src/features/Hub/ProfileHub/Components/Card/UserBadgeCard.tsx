type UserBadgeCardProps = {};

export function UserBadgeCard({}: UserBadgeCardProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <h2>Badges:</h2>
      <div className="w-full min-h-10 rounded-md p-4 bg-ludoGrayLight"></div>
    </div>
  );
}
