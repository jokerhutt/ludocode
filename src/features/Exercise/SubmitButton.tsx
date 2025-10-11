type SubmitButtonProps = {
    canSubmit: boolean;
}

export function SubmitButton({canSubmit}: SubmitButtonProps) {

  const activeStyle = "border-ludoYellow text-ludoYellow"  
  const disabledStyle = "border-ludoYellow/50 text-ludoYellow/50"  

  const style = canSubmit ? activeStyle : disabledStyle;

  return (
    <div className={`border py-2 px-4 rounded-xl ${style}`}>
      <p className="text-2xl">Submit ⌘+⏎</p>
    </div>
  );
}
