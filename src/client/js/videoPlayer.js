const video = document.querySelector("video");
const playBtn = document.getElementById("play"); 
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const playBtnIcon = playBtn.querySelector("i");
const muteBtnIcon = muteBtn.querySelector("i");
const fullScreenIcon = fullScreenBtn.querySelector("i");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
	playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";	
};

const handleMute = (e) => {
	if (video.muted) {
		video.muted = false;
	} else {
		video.muted = true;
	}
	muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
	volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
	const {
		target : { value },
	} = event;
	if (video.muted) {
		video.muted = false;
		muteBtn.innerText = "Mute";
	}
	volumeValue = value;
	video.volume= value;
}

const formatTime = (seconds) => {
	return new Date(seconds * 1000).toISOString().substring(14,19);
}

const handleLoadedMetaData = () => {
	totalTime.innerText = formatTime(Math.floor(video.duration));
	timeline.max = Math.floor(video.duration);
}

const handleTimeUpdate = () => {
	currentTime.innerText = formatTime(Math.floor(video.currentTime));
	timeline.value = Math.floor(video.currentTime);
}

const handleTimelineChange = (event) => {
	const {target : {value}} = event;
	video.currentTime = value;
}

const handleFullScreen = () => {
	const fullScreen = document.fullscreenElement;
	if (fullScreen) {
		document.exitFullscreen();
		fullScreenIcon.classList = "fas fa-expand";
	} else {
		videoContainer.requestFullscreen();
		fullScreenIcon.classList = "fas fa-compress";
	}
}

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
	if(controlsTimeout) {
		clearTimeout(controlsTimeout);
		controlsTimeout = null;
	}
	if(controlsMovementTimeout) {
		clearTimeout(controlsMovementTimeout);
		controlsMovementTimeout = null;
	}
	videoControls.classList.add("showing");
	controlsMovementTimeout = setTimeout(hideControls, 3000);
}

const handleMouseLeave = () => {
	controlsTimeout = setTimeout(hideControls, 3000);
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadeddata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);