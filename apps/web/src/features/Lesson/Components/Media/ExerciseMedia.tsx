type ExerciseMediaProps = { media: string };

export function ExerciseMedia({ media }: ExerciseMediaProps) {
  return (
    <div className="w-full items-center flex justify-center">
      <img className="max-h-60 w-auto" src={media} />
    </div>
  );
}
