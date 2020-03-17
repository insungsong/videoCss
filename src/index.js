import "./styles.css";

const videoContainer = document.getElementById("videoPlayer");
const videoPlayer = document.getElementById("video");
const playBtn = document.getElementById("playBtn");
const volumnBtn = document.getElementById("volumeBtn");
const bar = document.getElementById("videoPlayer__controls");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const rageBar = document.getElementById("rageBar");

var setTimeoutID = null;
var setRangeId = null;

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  rageBar.setAttribute("max", videoPlayer.duration);
  setRangeId = setInterval(getCurrentTime, 1000);
}

function handleKeyPress(event) {
  if (event.keyCode === 32) {
    handlePlayClick();
  }
}

function handleMouseOut() {
  bar.style.opacity = 0;
}

function handleOverClick() {
  bar.style.opacity = 1;
  clearTimeout(setTimeoutID);
  setTimeoutID = setTimeout(handleMouseOut, 3000);
}

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumnClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function getCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
  rageBar.value = videoPlayer.currentTime;

  if (rageBar.value == parseInt(rageBar.getAttribute("max"))) {
    rageBar.value = 0;
    videoPlayer.play();
  }
}

function handleDrag(event) {
  const {
    target: { value }
  } = event;
  videoPlayer.currentTime = value;
}

function init() {
  playBtn.addEventListener("click", handlePlayClick);
  volumnBtn.addEventListener("click", handleVolumnClick);
  videoContainer.addEventListener("mousemove", handleOverClick);
  videoContainer.addEventListener("mouseout", handleMouseOut);
  document.addEventListener("keydown", handleKeyPress);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  rageBar.addEventListener("click", handleDrag);
}

if (videoContainer) {
  init();
}
