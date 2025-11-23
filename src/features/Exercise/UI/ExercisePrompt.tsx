type ExercisePromptProps = {
    prompt: string;
}

export function ExercisePrompt({prompt}: ExercisePromptProps) {
  return <p className="text-white text-center text-md">{prompt}</p>;
}
