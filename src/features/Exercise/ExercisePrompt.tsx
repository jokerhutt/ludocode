type ExercisePromptProps = {
    prompt: string;
}

export function ExercisePrompt({prompt}: ExercisePromptProps) {
  return <p className="text-white text-xl">{prompt}</p>;
}
