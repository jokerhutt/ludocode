import { Howl } from "howler";

const sounds = {
  correct: new Howl({
    src: ["/audio/SFX/checkout.mp3"],
    volume: 0.4,
    html5: true,
    onloaderror: (error) =>
      console.error("Failed to load correct sound:", error),
  }),
  wrong: new Howl({
    src: ["/audio/SFX/wrong.mp3"],
    volume: 0.4,
    html5: true,
    onloaderror: (error) =>
      console.error("Failed to load wrong sound:", error),
  }),
};

export function playSound(name: keyof typeof sounds) {
  const s = sounds[name];
  if (!s) return;
  s.stop();
  s.play();
}
