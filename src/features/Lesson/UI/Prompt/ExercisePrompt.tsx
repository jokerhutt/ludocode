type ExercisePromptProps = {
    prompt: string;
}

export function ExercisePrompt({prompt}: ExercisePromptProps) {
  return <p className="text-white text-start text-md">{prompt}</p>;
}
