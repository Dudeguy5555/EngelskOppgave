// JS/KornAudio.js
let audioContext;
let audioBuffer;

export async function loadAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const response = await fetch("../Medie/korn-twist-audiotrimmer.mp3");
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  } catch (error) {
    console.error("Error loading audio:", error);
  }
}

export function playKornAudio() {
  if (!audioBuffer) return;
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start(0);
}
