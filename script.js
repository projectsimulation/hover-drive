// Day/Night Mode Toggle
const toggleBtn = document.getElementById("toggle-theme");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("day-mode");
});

// Audio Controls
const musicBtn = document.getElementById("toggle-music");
const audio = new Audio("assets/audio/Relax Ambient.mp3"); // Make sure the name matches exactly

let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    musicBtn.innerHTML = "⏸️ Stop Music";
  } else {
    audio.pause();
    musicBtn.innerHTML = "🎵 Play Music";
  }
  isPlaying = !isPlaying;
});
