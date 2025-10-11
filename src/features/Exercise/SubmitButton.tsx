type SubmitButtonProps = {
    canSubmit: boolean;
        submitAnswer: () => void;

}

export function SubmitButton({canSubmit, submitAnswer}: SubmitButtonProps) {

  const activeStyle = "border-ludoYellow text-ludoYellow"  
  const disabledStyle = "border-ludoYellow/50 text-ludoYellow/50"  

  const style = canSubmit ? activeStyle : disabledStyle;

  const trySubmit = () => {
    if (!canSubmit) return;
    submitAnswer();
  }

  return (
    <div onClick={() => trySubmit()} className={`border hover:cursor-pointer py-2 px-4 rounded-xl ${style}`}>
      <p className="text-2xl">Submit ⌘+⏎</p>
    </div>
  );
}
