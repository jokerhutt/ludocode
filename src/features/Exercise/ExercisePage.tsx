
export function ExercisePage() {
  return (
    <div className="grid grid-cols-12 grid-rows-[auto_1fr_auto] min-h-screen">
      <nav className="col-span-full flex min-h-16 bg-ludoGrayLight" />

      <main className="col-span-full grid grid-cols-12">
        <div className="col-span-3" />
        
        <div className="col-span-6 flex items-center h-full min-w-0">
          <div className="flex-1 h-60 rounded-2xl bg-ludoGrayLight" />
        </div>

        <div className="col-span-3" />
      </main>

      <footer className="col-span-full flex min-h-24 bg-ludoGrayLight" />
    </div>
  );
}