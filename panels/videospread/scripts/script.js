var originalVideoWidth = 852;
var originalVideoHeight = 480;
var videoContainer, video, buttonContainer;
var closeButton,audioButton,exitButton,restartButton,expandButton,logoButton;
var playVideo, muteCollapseVideo 	= false;
var autoPlayVideo,loopVideo 		= true;

function startAd() {
	initializeGlobalObjects();
	initializeVideo();
	subscribeUserEvents();
	if(autoPlayVideo==true){
		if (allowVideoAutoPlay) {
			playVideoOnAdExpand(video);
		}
	}
	if(loopVideo==true){
		video.loop = true;
	}
	video.addEventListener('ended',videoEndMovie,false);
}

function initializeGlobalObjects() {
	video 			= document.getElementById("video");
	videoContainer 	= document.getElementById("video-container");
	buttonContainer = document.getElementById("button-container");
	closeButton 	= document.getElementById("close-button");
	audioButton 	= document.getElementById("audio-button");
	exitButton 		= document.getElementById("exit-button");
	restartButton 	= document.getElementById("restart-button");
	pauseButton 	= document.getElementById("pause-button");
	expandButton 	= document.getElementById("expand-button");
	logoButton 		= document.getElementById("logo-button");
	
	if (allowAudioControl) {
		audioButton.style.display = "block";
	}
	
}

function videoEndMovie(e) {
	playVideo=false;
	restartButton.style.display = "block";
	pauseButton.style.display = "none";
 	video.load();     
}


// initialize the video object
function initializeVideo() {
	video.controllers = false;
	var videoTrackingModule = new EBG.VideoModule(video);
	
	// preload mute button
	var img = new Image();
	img.src = "images/mute.png";
	
	// resize video
	setTimeout(resizeVideo, videoSpreadConfig.expandingAnimateTime * 1000);
}
function handleButtonClick(){
	EB.clickthrough("click video");
}


function subscribeUserEvents() {
	exitButton.addEventListener		("click", handleExitButtonClick);
	audioButton.addEventListener	("click", handleAudioButtonClick);
	closeButton.addEventListener	("click", handleCloseButtonClick);
	restartButton.addEventListener	("click", handlePauseRestartButtonClick);
	pauseButton.addEventListener	("click", handlePauseRestartButtonClick);
	expandButton.addEventListener	("click", handleExpandButtonClick);
	logoButton.addEventListener		("click", handleLogoButtonClick);
	videoClick.addEventListener		("click", handleButtonClick);
	
	closeButton.style.display = "none";
	/*
	if (isMobileDevices) {	
		document.body.addEventListener("touchmove", function(event) {
			event.preventDefault();
		});
	}
	*/
	window.addEventListener("resize", resizeVideo);
}

// resize video and re-position the video
function resizeVideo() {
	var winWidth = allowOverlayButtons ? window.innerWidth : Math.floor(restartButton.getBoundingClientRect().left);
	var winHeight = allowOverlayButtons ? window.innerHeight : Math.floor(restartButton.getBoundingClientRect().top);
	var videoWidth = videoHeight = 0;
	videoWidth = winWidth;
	videoHeight = Math.floor(winWidth / (originalVideoWidth / originalVideoHeight));
	
	if (videoHeight < winHeight) {
		videoHeight = winHeight;
		videoWidth = Math.floor(originalVideoWidth * (winHeight / originalVideoHeight));
	}
	video.style.left = video.style.top = "0px";
	videoContainer.style.width = video.style.width = videoWidth + "px";
	videoContainer.style.height = video.style.height = videoHeight + "px";
	
	buttonContainer.style.width = window.innerWidth + "px";
	buttonContainer.style.height = window.innerHeight + "px";
	
	if (videoWidth > winWidth) {
		video.style.left = (0 - ((videoWidth - winWidth) / 2)) + "px";
	}			
	if (videoHeight >= winHeight) {
		video.style.top = (0 - ((videoHeight - winHeight) / 2)) + "px";
	}
	if (!allowOverlayButtons) {
		videoContainer.style.clip = "rect(0px, " + winWidth + "px, " + winHeight + "px, 0px)";
	}
	if (isMobileDevices) {	
		videoContainer.style.position = "fixed"; // this is to prevent video scroll in mobile device
	}
	videoContainer.style.visibility = "visible";
	video.style.display = "block";
	if (isAndroidBrowser) {
		videoContainer.style.position 	= "absolute";
		buttonContainer.style.position 	= "absolute";
		closeButton.style.position 		= "absolute";
		restartButton.style.position 	= "absolute";
		pauseButton.style.position 		= "absolute";
		exitButton.style.position 		= "absolute";
		expandButton.style.position 	= "absolute";
		logoButton.style.position 		= "absolute";
	}
}

// handle close button clicked
function handleExitButtonClick() {
	video.pause();
	EB.collapse();
}

// handle play button clicked
function handlePlayButtonClick() {
	// clear video auto play delay timer
	clearVideoAutoPlayDelayTimer();
	video.play();
}

// handle pause button clicked
function handlePauseButtonClick() {
	// clear video auto play delay timer
	clearVideoAutoPlayDelayTimer();
	video.pause();
}	


// handle restart button clicked
function handlePauseRestartButtonClick() {
	if(playVideo==false){
		playVideo=true;
		restartButton.style.display = "none";
		pauseButton.style.display = "block";
		EB.userActionCounter("click RestartPlay Video");
		clearVideoAutoPlayDelayTimer();
		if (allowAudioControl) {
			if(!isMuteButtonEngaged()) {
				video.muted = false;
				setAudioButton();
			}
			video.currentTime = 0;
		}
		video.play();
		setVideoIsPlayed();
	}else{
		pauseButton.style.display = "none";
		restartButton.style.display = "block";
		playVideo=false;
		handlePauseButtonClick();
	}
}


function handleLogoButtonClick(){
	EB.clickthrough("click logo");
}

function handleExpandButtonClick(){
	expandButton.style.display = "none";
	logoButton.style.display = "block";
	EB.userActionCounter("click Expand Video");
	playVideo = false;
	handlePauseRestartButtonClick();
	EB._sendMessage("expandButtonClicked",{});
}

// handle audio button clicked
function handleAudioButtonClick() {
	muteButtonEngaged();
	video.muted = !video.muted;
	setAudioButton();
}

// handle scroll down button clicked
function handleCloseButtonClick() {
	closeButton.style.display = "none";
	expandButton.style.display = "block";
	logoButton.style.display = "none";
	
	if(muteCollapseVideo){
		if(!isMuteButtonEngaged()) {
			video.muted = true;
			setAudioButton();
		}
	}
	
	// clear video auto play delay timer
	clearVideoAutoPlayDelayTimer();
	EB._sendMessage("scrollButtonClicked",{});
}

function showButtons() {
	buttonContainer.style.display = "block";
	// iOS8 buttons are missing when first expand for no reason, change opacity for one of the button fix the issue
	/*exitButton.style.opacity = 0.99;
	setTimeout(function() {
		exitButton.style.opacity = 1;
	}, 500);	*/
}

function hideButtons() {
	buttonContainer.style.display = "none";
}

function setAudioButton() {
	audioButton.style.background = "url(images/" + (video.muted ? "un" : "") + "mute.png)";
}


/*************************************************************************************/
/* libraries below, please do not change unless you are 100% sure what you are doing */
/*************************************************************************************/

var videoSpreadConfig = {}

function isAutoExpand() {
	return videoSpreadConfig.expandType === undefined || videoSpreadConfig.expandType === EBG.ActionType.AUTO;
}

function isVideoPlayed() {
	return videoSpreadConfig.videoIsPlayed;
}

function isMuteButtonEngaged() {
	return videoSpreadConfig.muteButtonEngaged;
}

function getAdID() {
	if (EB._isLocalMode) {
		return null;
	}
	else {
		return EB._adConfig.adId;
	}
}

function getCustomJSVar(varName, defaultValue) {
	try {
		if (typeof EB._adConfig.customJSVars !== "undefined" && EB._adConfig.customJSVars.hasOwnProperty(varName)) {
			if (EB._adConfig.customJSVars[varName] === "null") {
				return defaultValue ? defaultValue : "null";
			} else {
				return EB._adConfig.customJSVars[varName].toString().replace(/&quot;/g, '"');
			}
		} else {
			return defaultValue ? defaultValue : "null";
		}
	} catch(error) {
		return defaultValue ? defaultValue : "null";
	}
}

function getVideoAutoPlayDelay() {
	return isVideoPlayed() ? 0 : videoSpreadConfig.videoAutoPlayDelay * 1000;
}

function muteButtonEngaged() {
	videoSpreadConfig.muteButtonEngaged = true;
}

function setExpandType(expandType) {
	videoSpreadConfig.expandType = expandType;
	if (videoSpreadConfig.expandType === EBG.ActionType.USER && videoSpreadConfig.videoObject !== null) {
		playVideoOnAdExpand(videoSpreadConfig.videoObject);
	}
}

function setVideoIsPlayed() {
	videoSpreadConfig.videoIsPlayed = true;
	playVideo=true;
	restartButton.style.display = "none";
	pauseButton.style.display = "block";
}

function clearVideoAutoPlayDelayTimer() {
	if (videoSpreadConfig.videoAutoPlayDelayTimer) {
		clearTimeout(videoSpreadConfig.videoAutoPlayDelayTimer);
	}
}

function playVideoOnAdExpand(myVideo) {
	videoSpreadConfig.videoObject = myVideo;
	videoSpreadConfig.videoAutoPlayDelayTimer = setTimeout(function() {
		if (!isMuteButtonEngaged()) {
			videoSpreadConfig.videoObject.muted = isAutoExpand() ? true : false;
		}
		setAudioButton();
		videoSpreadConfig.videoObject.play();
		setVideoIsPlayed();
	}, getVideoAutoPlayDelay());	
}


function showCloseFullButton(){
	playVideo = false;
	handlePauseRestartButtonClick();
	closeButton.style.display = "block";
	expandButton.style.display = "none";
	logoButton.style.display = "block";
}

function onMessageReceived(event) {
	try {
		var messageData = JSON.parse(event.data);

		if (messageData.adId && messageData.adId === getAdID()) {
			switch(messageData.type) {
				case "expandFull":
					showCloseFullButton();
					break;
				case "setExpandType":
					setExpandType(messageData.expandType);
					break;
				case "playVideo":
					handlePlayButtonClick();
					break;
				case "pauseVideo":
					handlePauseButtonClick();
					break;
				case "showButtons":
					showButtons();
					break;
				case "hideButtons":
					hideButtons();
					break;
				default:
					break;
			}
		}
	} catch (error) {
	
	}
}

function EBInitialized() {
	if (typeof videoSpreadConfig === "undefined") {
		videoSpreadConfig = {};
	}
	videoSpreadConfig.expandType = EBG.ActionType.AUTO;
	videoSpreadConfig.videoObject = null;
	videoSpreadConfig.videoIsPlayed = false;
	videoSpreadConfig.muteButtonEngaged = false;
	videoSpreadConfig.videoAutoPlayDelayTimer = null;
	videoSpreadConfig.videoAutoPlayDelay 	= (getCustomJSVar("mdVideoAutoPlayDelay", 1) * 1) + 0.5;
	videoSpreadConfig.expandingAnimateTime 	= (getCustomJSVar("mdAnimateTime", 0.5) * 1) + 0.25;
	
	autoPlayVideo 		= getCustomJSVar("mdAutoPlayVideo", true);
	loopVideo 			= getCustomJSVar("mdLoopVideo", true);
	muteCollapseVideo 	= getCustomJSVar("mdMuteCollapseVideo", false);

	
	ua = navigator.userAgent;
	isMobileDevices = ua.match(/ipad|android/i) !== null;
	isAndroidBrowser = ua.match(/android/i) !== null && ua.match(/safari/i) !== null;
	allowOverlayButtons = !(ua.match(/ipad/i) !== null && ua.match(/os [1-7]/i) !== null);
	allowVideoAutoPlay = ua.match(/ipad|android/i) === null;
	allowAudioControl = ua.match(/ipad|android/i) === null;
	startAd();
	window.addEventListener("message", onMessageReceived);
	// make sure the video is paused when ad got removed for any reason
	window.addEventListener("unload", function() {
		handlePauseButtonClick();
	});
}

function initEB(){
	if (!EB.isInitialized()) {
		EB.addEventListener(EBG.EventName.EB_INITIALIZED, EBInitialized);
	}
	else {
		EBInitialized();
	}
}