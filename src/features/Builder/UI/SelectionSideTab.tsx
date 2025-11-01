type SelectionSideTabProps = {
  active: boolean;
  onClick: () => void;
  hasError?: string;
};

export function SelectionSideTab({
  active,
  onClick,
  hasError,
}: SelectionSideTabProps) {
  return (
    <div
      className={`w-4 hover:cursor-pointer self-stretch flex ${
        hasError
          ? "bg-red-500"
          : active
          ? "bg-ludoLightPurple"
          : "bg-ludoLightPurple/20"
      }`}
      onClick={onClick}
    >
      <p></p>
    </div>
  );
}
