import { Howl } from "howler";

const sounds = {
  correct: new Howl({ src: ["Audio/SFX/success.mp3"], volume: 0.4 }),
  wrong: new Howl({ src: ["Audio/SFX/wrong.mp3"], volume: 0.4 }),
};

export function playSound(name: keyof typeof sounds) {
  const s = sounds[name];
  if (!s) return;
  s.stop();
  s.play();
}
