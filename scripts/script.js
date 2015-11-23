// global variables for HTML objects
var bannerDiv;
var expansionDiv;
var autoExpandTimer = null;
var expanded=false;

function startAd() {
	// initialize global variables
	bannerDiv = document.getElementById("banner");
	expansionDiv = document.getElementById("expansion");
	
	// display banner
	bannerDiv.style.visibility = "visible";	
}

// auto expand function
function autoExpand() {
	autoExpandTimer = setTimeout(function() {
		init("AUTO");
	}, getAutoExpandDelay());
}

// user expand function
function userExpand() {
	if (autoExpandTimer) {
		clearTimeout(autoExpandTimer);
	}
	expand('USER');
}

// expand function
function expand(actionType) {
	// expand ad frame
	var timeFull;
	if(expanded==true){
		timeFull = (videoSpreadConfig.animationTime + 0.5) * 1000;
	}else{
		timeFull = 2500;
	}
	
	
	EB.expand({actionType: actionType});
/*	setTimeout(function(){
		EB._sendMessage("ebExpandFULLPanel",{});
	}, (videoSpreadConfig.animationTime + 0.5) * 1000);
	*/
	
	
	setTimeout(function(){
		EB._sendMessage("ebExpandFULLPanel",{});
		expandFull();
	}, timeFull);
}

// INIT expand function
function init(actionType) {
	EB.expand({actionType: actionType});
	expanded = true;
}

// collapse function
function collapse() {
	expansionDiv.style.visibility = "hidden";
	bannerDiv.style.visibility = "visible";
}

function expandFull() {
	expansionDiv.style.visibility = "visible";
	bannerDiv.style.visibility = "hidden";
}

// handle expand button clicked
function handleExpandButtonClick() {
	userExpand();
}

// handle close button clicked
function handleCloseButtonClick() {
	collapse();
}

// handle default click through
function handleClickthroughButtonClick() {
	EB.clickthrough();
}	

/*************************************************************************************/
/* libraries below, please do not change unless you are 100% sure what you are doing */
/*************************************************************************************/

var videoSpreadConfig = {}

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

function getAutoExpandDelay() {
	return videoSpreadConfig.autoExpandDelay * 1000;
}

function setUpAutoExpandFrequencyCapping() {
	var autoExpandSettings = {
		isEnabled: videoSpreadConfig.frequencyCappingEnabled === "true",
		frequency: EB.autoExpandFrequencyCapping.Frequencies[videoSpreadConfig.frequencyCapping.toUpperCase()],
		expansionsPerPeriod: videoSpreadConfig.frequencyCappingLimit
	};
	var beforeAutoExpandSubscription = new EB.autoExpandFrequencyCapping.EventSubscription({
		eventName: EB.autoExpandFrequencyCapping.Events.AUTO_EXPAND, 
		callback: videoSpreadConfig.frequencyCappingCallback, 
		callbackBinding: this, 
		timing: EB.autoExpandFrequencyCapping.EventTiming.BEFORE
	});
	
	EB.autoExpandFrequencyCapping.subscribeToEvent(beforeAutoExpandSubscription);
	EB.autoExpandFrequencyCapping.initialize(autoExpandSettings);
}




function onMessageReceived(event) {
	try {
		var messageData = JSON.parse(event.data);
		if (messageData.adId && messageData.adId === getAdID()) {
			switch(messageData.type) {
				case "expandFull":
					expanded = true;
					expandFull();
					break;
				case "closeFull":
					collapse();
					break;
				case "closeVideoPanel":
					expanded = false;
					collapse();
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
	videoSpreadConfig.frequencyCappingEnabled 	= getCustomJSVar("mdFrequencyCappingEnabled", true);
	videoSpreadConfig.frequencyCapping 			= getCustomJSVar("mdFrequencyCappingPeriod", "UNLIMITED").toUpperCase();
	videoSpreadConfig.frequencyCappingLimit 	= getCustomJSVar("mdFrequencyCappingLimit", 1);
	videoSpreadConfig.autoExpandDelay 			= getCustomJSVar("mdAutoExpandDelay", 1.5) * 1;
	videoSpreadConfig.animationTime 			= getCustomJSVar("mdAnimateTime", 0.5) * 1;
	
	videoSpreadConfig.frequencyCappingCallback = autoExpand;
	EB._myExpand = EB.expand;
	EB.expand = function(prop) {
		EB._myExpand({panelName: "videospread", actionType: EBG.ActionType[prop.actionType]});
	}
	if(EB._adConfig !== null){
		if (!EB._adConfig.hasOwnProperty("expansionParams")) {
			EB._adConfig.expansionParams = {};
		}
	}
	startAd();
	window.addEventListener("message", onMessageReceived);
	try {
		if ((EB.browserSupports("localStorage") || (videoSpreadConfig.frequencyCapping == EB.autoExpandFrequencyCapping.Frequencies.SESSION && EB.browserSupports("sessionStorage"))) && videoSpreadConfig.hasOwnProperty("frequencyCapping")) {
			if (videoSpreadConfig.frequencyCapping.toUpperCase() == "UNLIMITED"){
				autoExpand();
			} else {
				setUpAutoExpandFrequencyCapping();
			}
		}else{
			autoExpand();
		}
	} catch(error) {
	}	
}

function initEB(){
	if (!EB.isInitialized()) {
		EB.addEventListener(EBG.EventName.EB_INITIALIZED, EBInitialized);
	}
	else {
		EBInitialized();
	}
}