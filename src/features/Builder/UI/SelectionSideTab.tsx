type SelectionSideTabProps = {
  active: boolean;
  onClick: () => void;
};

export function SelectionSideTab({ active, onClick }: SelectionSideTabProps) {
  return (
    <div
      className={`w-4 hover:cursor-pointer self-stretch flex ${
        active ? "bg-ludoLightPurple" : "bg-ludoLightPurple/20"
      }`}
      onClick={onClick}
    >
      <p></p>
    </div>
  );
}
