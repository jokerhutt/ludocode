type WideClickableOptionProps = {
    option: string;
  userSelections: string[];
  setAnswerAt: (index: number, value: string) => void;
  isCorrect? : boolean;
};

export function WideClickableOption({option, userSelections, setAnswerAt}: WideClickableOptionProps) {

    const isSelected = userSelections[0] == option;

    const stateStyle = isSelected ? `border-pythonYellow` : 'border-ludoBlueGray'

    const handleChange = () => {
        if (isSelected) return;
        setAnswerAt(0, option);
    }
  
    return (
        <div onClick={() => handleChange()} className={`w-full ${stateStyle} border px-6 py-2 bg-ludoGrayLight rounded-lg `}>
            <p className="text-left text-white">{option}</p>
        </div>
  );
}