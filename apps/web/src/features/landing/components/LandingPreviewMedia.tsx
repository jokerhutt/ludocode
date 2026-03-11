
export function LandingPreviewMedia() {
  return (
    <section className="px-6 lg:px-18 flex justify-center">
      <div className="w-full max-w-4xl rounded-lg overflow-hidden border border-ludo-border">
        <video
          src="/video/ludoshowcase.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full block"
        />
      </div>
    </section>
  );
}
