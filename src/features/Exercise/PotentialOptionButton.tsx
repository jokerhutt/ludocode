type PotentialOptionButtonProps = {
    option: string;
    userSelections: string[]; 
    addSelection: (option: string) => void;
}

export function PotentialOptionButton({
  option,
  userSelections,
  addSelection
}: PotentialOptionButtonProps) {

  const isSelected = userSelections.some(selection => selection == option)  

  const handleClick = () => {
    if (isSelected) return;
    addSelection(option);
  }

  const allowedStyle = `text-white border-ludoGrayLight/50`
  const disabledStyle = `text-white/50 border-ludoGrayLight/50`
  const displayStyle = isSelected ? disabledStyle : allowedStyle;

  return (
    <div onClick={() => handleClick()} className={`py-2 hover:cursor-pointer ${displayStyle} px-4 border-3 border-ludoGrayLight rounded-xl`}>
      <p className="text-lg">{option}</p>
    </div>
  );
}
