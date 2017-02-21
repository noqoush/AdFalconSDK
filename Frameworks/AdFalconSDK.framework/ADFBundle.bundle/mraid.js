(function () {
    console = {};
    console.log = function (log) {
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", "console://localhost?" + log);
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    };
    console.debug = console.info = console.warn = console.error = console.log;
}());

(function () {
    var mraidbridge = window.mraidbridge = {};

    //// mraidbridge var
    var nativeCallQueue = [];
    var nativeCallInFlight = false;


    // mraid
    var mraid = window.mraid = {};

    //// enum
    var STATES = mraidbridge.STATES = {
        LOADING: "loading",
        DEFAULT: "default",
        EXPANDED: "expanded",
        RESIZED: "resized",
        HIDDEN: "hidden"
    };

    var EVENTS = mraidbridge.EVENTS = {
        ERROR: "error", //function(message, action)
        READY: "ready", //function()
        STATE_CHANGE: "stateChange", //function(state) state - String, either
        VIEWABLE_CHANGE: "viewableChange", //function(boolean)
        SIZE_CHANGE: "sizeChange", //function(width, height)
        TILT_CHANGE: "tiltChange",//function(x, y, z)
        SHAKE: "shake",//function()
        IVIDEO_TRACKING_CHANGE:"ivideoTrackingChange",
        IVIDEO_TIMEUPDATE_CHANGE:"ivideoTimeUpdateChange"
    };

    var PLACEMENT_TYPES = mraidbridge.PLACEMENT_TYPES = {
        UNKNOWN: "unknown",
        INLINE: "inline",
        INTERSTITIAL: "interstitial"
    };

    var FEATURES = mraidbridge.FEATURES = {
        SMS: "sms",
        PHONE: "phone",
        CALENDAR: "calendar",
        STORE_PICTURE: "storePicture",
        INLINE_VIDEO: "inlineVideo"
    };
    
    var ORIENTATION_PROPERTIES_FORCE_ORIENTATION = mraidbridge.ORIENTATION_PROPERTIES_FORCE_ORIENTATION = {
        PORTRAIT    :"portrait",
        LANDSCAPE   :"landscape",
        NONE        :"none"
    };
 
    var RESIZE_PROPERTIES_CUSTOM_CLOSE_POSITION = mraid.RESIZE_PROPERTIES_CUSTOM_CLOSE_POSITION = {
        TOP_LEFT        :"top-left",
        TOP_RIGHT       :"top-right",
        CENTER          :"center",
        BOTTOM_LEFT     :"bottom-left",
        BOTTOM_RIGHT    :"bottom-right",
        TOP_CENTER      :"top-center",
        BOTTOM_CENTERT  :"bottom-center"
     };
 

 
    //// var
    var VERSION = mraidbridge.VERSION = "2.0";
    var listeners = {};
    var state = mraidbridge.STATES.LOADING;
    var isViewable = false;
    var placementType = mraidbridge.PLACEMENT_TYPES.UNKNOWN;
    //location
    var currentPosition = {
        x: -1,
        y: -1,
        width: -1,
        height: -1
    };
    var defaultposition = {
        x: -1,
        y: -1,
        width: -1,
        height: -1
    };
    var maxsize = {
        width: -1,
        height: -1
    };
    var screensize = {
        width: -1,
        height: -1
    };
    ///
    var supportedFeatures = {};
 
    var orientationProperties = {
        allowOrientationChange:true,
        forceOrientation:ORIENTATION_PROPERTIES_FORCE_ORIENTATION.NONE
    };
 	var expandProperties = {
 		 width : -1,
         height : -1,
         useCustomClose : false,
         isModal : true //read only
     };
 
    var resizeProperties = {
        width:0,
        height:0,
        customClosePosition:RESIZE_PROPERTIES_CUSTOM_CLOSE_POSITION.TOP_RIGHT,
        offsetX:0,
        offsetY:0,
        allowOffscreen:false
    };
 
    var currentAcceleration={
        x:0,
        y:0,
        z:0
    };
 
    //privet
    var contains = function (value, array) {
        for (var i in array) {
            if (array[i] === value) return true;
        }
        return false;
    };

    var stringify = function (obj) {
        if (typeof obj === 'object') {
            var out = [];
            if (obj.push) {
                // Array.
                for (var p in obj) out.push(obj[p]);
                return '[' + out.join(',') + ']';
            } else {
                // Other object.
                for (var p in obj) out.push("\"" + p + "\":" + obj[p]);
                return '{' + out.join(',') + '}';
            }
        } else return String(obj);
    };
    
	var stringifyQuery = function(obj){
		 if (typeof obj === 'object') {
	        var outString = '';
	        
	        for (var p in obj)
	        {
	            if (outString)
	            {
	                outString += '&';
	            }
	            
	            outString += encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]);
	        }
	        
	        return outString;
	     }
		else return '';
	 };

    var changeHandlers = {
        state: function (val) {
            console.log("state new val:" + stringify(val));
            state = val;
            mraidbridge.fireChangeEvent(EVENTS.STATE_CHANGE, state);
        },

        viewable: function (val) {
            console.log("viewable new val:" + stringify(val));
            isViewable = val;
            mraidbridge.fireChangeEvent(EVENTS.VIEWABLE_CHANGE, isViewable);
        },

        placementtype: function (val) {
            console.log("placementtype new val:" + stringify(val));
            placementType = val;
        },

        currentposition: function (val) {
            console.log("currentposition new val:" + stringify(val));
            var oldCurrentPosition = {
                x: currentPosition.x,
                y: currentPosition.y,
                width: currentPosition.width,
                height: currentPosition.height
            };
 
            currentPosition = {
                x: val.x,
                y: val.y,
                width: val.width,
                height: val.height
            };
            if(val.isforce == true ){
                mraidbridge.firesSizeChangeEvent(currentPosition.width, currentPosition.height);
            }
            else if (currentPosition.width != oldCurrentPosition.width || currentPosition.height != oldCurrentPosition.height) {
                mraidbridge.firesSizeChangeEvent(currentPosition.width, currentPosition.height);
            };
 ;
        },

        defaultposition: function (val) {
            console.log("defaultposition new val:" + stringify(val));
            defaultposition = val;
        },

        maxsize: function (val) {
            console.log("maxsize new val:" + stringify(val));
            maxsize = val;
        },

        screensize: function (val) {
            console.log("screensize new val:" + stringify(val));
            screensize = val;
        },

        supports: function (val) {
            console.log("supports new val:" + stringify(val));
            supportedFeatures = val;
        },
        
        orientationProperties:function (val) {
            console.log("orientationProperties new val:" + stringify(val));
			for (var key in val) {
		   		if (val.hasOwnProperty(key)) orientationProperties[key] = val[key];
		    }
        },
        expandProperties:function (val) {
            console.log("expandProperties new val:" + stringify(val));
            for (var key in val) {
                if (val.hasOwnProperty(key)) expandProperties[key] = val[key];
            }
         },
         resizeProperties:function (val) {
            console.log("resizeProperties new val:" + stringify(val));
            for (var key in val) {
                if (val.hasOwnProperty(key)) resizeProperties[key] = val[key];
            }
         },
         acceleration: function (val) {
            console.log("acceleration new val:" + stringify(val));
            currentAcceleration = val;
            mraidbridge.firesTiltChangeEvent(currentAcceleration.x, currentAcceleration.y,currentAcceleration.z);
         },
 
         ivideoTracking: function (val) {
            console.log("ivideoTracking new val:" + stringify(val));
            ivideoTracking = val;
            mraidbridge.fireChangeEvent(EVENTS.IVIDEO_TRACKING_CHANGE, val);
         },
 
         ivideoTimeUpdate: function (val) {
            console.log("ivideoCurrentPosition new val:" + stringify(val));
            ivideoCurrentPosition = val;
            mraidbridge.fireChangeEvent(EVENTS.IVIDEO_TIMEUPDATE_CHANGE, val);
         },
        ivideoDuration: function (val) {
            console.log("ivideoDuration new val:" + stringify(val));
            ivideoDuration = val;
         }
    }

	var numberValidator = function(v) { return !isNaN(v)};
    var uNumberValidator = function(v) { return !isNaN(v) && v >= 0};
	var boolValidator = function(v) { return (typeof v === 'boolean')}; 
	
    ///mraidbridge
    mraidbridge.fireEvent = function (event) {

        console.log("fireEvent handler:" + stringify(event));

        var handlers = listeners[event];
        if (handlers) {
            for (var id in handlers) {
                if (handlers.hasOwnProperty(id)) handlers[id]();
            }
        }
 
        if(event === 'ready'){
 
            if(listeners['shake'])
                mraidbridge.executeNativeCall("addeventlistener", "event", "shake");
 
            if(listeners['tiltChange'])
                mraidbridge.executeNativeCall("addeventlistener", "event", "tiltChange");
        }
 
    };

    mraidbridge.fireErrorEvent = function (message, action) {
        console.log("fireErrorEvent action:" + action + " message:" + message);

        var handlers = listeners[EVENTS.ERROR];
        if (handlers) {
            for (var id in handlers) {
                if (handlers.hasOwnProperty(id)) handlers[id](message, action);
            }

        }
    };

    mraidbridge.fireChangeEvent = function (event, newValue) {
        console.log("fireChangeEvent handler:" + event + " with:" + newValue);

        var handlers = listeners[event];
        if (handlers) {
            for (var id in handlers) {
                if (handlers.hasOwnProperty(id)) handlers[id](newValue);
            }
        }
    };

    mraidbridge.firesSizeChangeEvent = function (width, height) {
        console.log("firesSizeChangeEvent with width: " + String(width) + " and height:" + String(height));

        var handlers = listeners[EVENTS.SIZE_CHANGE];
        if (handlers) {
            for (var id in handlers) {
                if (handlers.hasOwnProperty(id)) handlers[id](width, height);
            }
        }
    };

    mraidbridge.firesPropertyChangeEvent = function (property) {;
        if (property) {
            for (var id in property) {
                if (property.hasOwnProperty(id)) {
                    var handler = changeHandlers[id];
                    handler(property[id]);
                }
            }
        }
    };
 
    mraidbridge.firesTiltChangeEvent = function (x, y, z) {
        console.log("firesTiltChangeEvent with x: " + String(x) + " and y: " + String(y) + " and z: " + String(z));

        var handlers = listeners[EVENTS.TILT_CHANGE];
        if (handlers) {
            for (var id in handlers) {
                if (handlers.hasOwnProperty(id)) handlers[id](x, y, z);
            }
        }
    };
 
    mraidbridge.showListeners = function () {
        return listeners;
    };

    mraidbridge.nativeCallComplete = function (command) {
        console.log("nativeCallComplete command " + command);
        if (nativeCallQueue.length === 0) {
            nativeCallInFlight = false;
            return;
        }

        var nextCall = nativeCallQueue.pop();
        window.location = nextCall;
    };

    mraidbridge.executeNativeCall = function (command) {
        console.log("executeNativeCall with command: " + command);
        var call = 'mraid://' + command;

        var key, value;
        var isFirstArgument = true;

        for (var i = 1; i < arguments.length; i += 2) {
            key = arguments[i];
            value = arguments[i + 1];

            if (value === null) continue;

            if (isFirstArgument) {
                call += '?';
                isFirstArgument = false;
            } else {
                call += '&';
            }

            call += key + '=' + escape(value);
        }

        if (nativeCallInFlight) {
            nativeCallQueue.push(call);
        } else {
            nativeCallInFlight = true;
            window.location = call;
        }
    };


    ///////mraid
    ///gets
    mraid.getVersion = function () {
        console.log("getVersion");
        return mraidbridge.VERSION ;
    };

    mraid.isViewable = function () {
        console.log("isViewable");
        return isViewable;
    };
    mraid.getCurrentPosition = function () {
        console.log("getCurrentPosition");
        return currentPosition;
    }
    mraid.getDefaultPosition = function () {
        console.log("getDefaultPosition");
        return defaultposition;
    };
    mraid.getMaxSize = function () {
        console.log("getMaxSize");
        return maxsize;
    };

    mraid.getState = function () {
        console.log("getState : " + state);
        return state;
    };

    mraid.getPlacementType = function () {
        console.log("getPlacementType");
        return placementType;
    };

    mraid.getSize = function () {
        console.log("getSize");
        var size = {
            width: currentPosition.width,
            height: currentPosition.height
        };
        return size;
    };
    mraid.getScreenSize = function () {
        console.log("getScreenSize");
        return screensize;
    };

    mraid.supports = function (feature) {
        console.log("supports with feature: " + feature);
        if (!feature) {
            mraidbridge.fireErrorEvent('feature are required.', 'supports');
        } else {
            return supportedFeatures[feature];
        }
    };
    ///EventListene
    mraid.addEventListener = function (event, listener) {
        //console.log("addEventListener event: " + event + "listener: " + String(listener));
        if (!event || !listener) {
            mraidbridge.fireErrorEvent('Both event and listener are required.', 'addEventListener');
        } else if (!contains(event, EVENTS)) {
            mraidbridge.fireErrorEvent('Unknown MRAID event: ' + event, 'addEventListener');
        } else {
            var id = String(listener);
            var handlers = listeners[event];
            if (!handlers) {
                listeners[event] = {};
                handlers = listeners[event];
            }
            if (!handlers[id]) {
                handlers[id] = listener;
            };
 
            //
            //mraidbridge.executeNativeCall("addeventlistener", "event", event);
        }
    };

    mraid.removeEventListener = function (event, listener) {
        console.log("removeEventListener event: " + event);
        if (!event) {
            mraidbridge.fireErrorEvent('event are required.', 'removeEventListener');
        } else if (!contains(event, EVENTS)) {
            mraidbridge.fireErrorEvent('Unknown MRAID event: ' + event, 'addEventListener');
        } else {
            var id = String(listener);
            var handlers = listeners[event];
            if (handlers) {
                if (listener) delete handlers[id];
                else {//deleat all if listener nil
                    for (var id in handlers) {
                        if (handlers.hasOwnProperty(id)) delete handlers[id]
                    };
                }
                if(event === 'shake' || event === 'tiltChange')mraidbridge.executeNativeCall("removeeventlistener", "event", event);
            }
        }
    };

    ///commands
    mraid.open = function (url) {
        console.log("mraid.open with url: " + url);
        if (!url) mraidbridge.fireErrorEvent('url are required.', 'open');
        else mraidbridge.executeNativeCall("open", "url", url);
    };
 
    mraid.getOrientationProperties = function(){
        console.log("mraid.getOrientationProperties ");
 		var property = {
  			allowOrientationChange:orientationProperties.allowOrientationChange,
        	forceOrientation:orientationProperties.forceOrientation
        };
        return property ;
    };
    
 	mraid.setOrientationProperties = function(property){
	 	console.log("mraid.setOrientationProperties with: " + stringify(property));
	 	
	 	var writableFields = ["allowOrientationChange", "forceOrientation"];
		
		///validate
		if (!property){mraidbridge.fireErrorEvent('Required object not provided.', 'setOrientationProperties'); return;}	
		
		var allowOrientationChange = property["allowOrientationChange"];
		if (allowOrientationChange !== undefined && !boolValidator(allowOrientationChange)){
			mraidbridge.fireErrorEvent('Value of property allowOrientationChange is invalid.', 'setOrientationProperties');
            return;}
				
		var forceOrientation = property["forceOrientation"];
		if (forceOrientation !== undefined && !contains(forceOrientation, ORIENTATION_PROPERTIES_FORCE_ORIENTATION)){
			mraidbridge.fireErrorEvent('Value of property forceOrientation is invalid.', 'setOrientationProperties');
            return;}
	
        //set data
	 	for (wrfield in writableFields)
        {
            var field = writableFields[wrfield];
            if (property.hasOwnProperty(field))
            {
                orientationProperties[field] = property[field];
            }
        }
 
        var orientationPropertiesString = "{\"allowOrientationChange\":" + orientationProperties.allowOrientationChange + " ,\"forceOrientation\":\"" + orientationProperties.forceOrientation + "\"}"
        mraidbridge.executeNativeCall("setorientationproperties", "property", orientationPropertiesString);
	 };
 

 
	 mraid.setExpandProperties = function(property)
	 {
	 
		console.log("mraid.setExpandProperties with: ");
	 	
	 	var writableFields = ["width", "height", "useCustomClose"];
		
		///validate
		if (!property){mraidbridge.fireErrorEvent('Required object not provided.', 'setExpandProperties'); return;}	
		
		var width = property["width"];
		if (width !== undefined && !uNumberValidator(width)){
			mraidbridge.fireErrorEvent('Value of property width is invalid.', 'setExpandProperties');
            return;}
            
		var height = property["height"];
		if (height !== undefined && !uNumberValidator(height)){
			mraidbridge.fireErrorEvent('Value of property height is invalid.', 'setExpandProperties');
            return;}
		
		var useCustomClose = property["useCustomClose"];
		if (useCustomClose !== undefined && !boolValidator(useCustomClose)){
			mraidbridge.fireErrorEvent('Value of property useCustomClose is invalid.', 'setExpandProperties');
            return;}
        //set data
	 	for (wrfield in writableFields)
        {
            var field = writableFields[wrfield];
            if (property.hasOwnProperty(field))
            {
                expandProperties[field] = property[field];
            }
        }
 
        var expandPropertiesString = stringify(expandProperties);
        mraidbridge.executeNativeCall("setexpandproperties", "property", expandPropertiesString);
	 };
 
     mraid.getExpandProperties = function()
     {
        console.log("getExpandProperties");
        var property = {
            width : expandProperties.width,
            height : expandProperties.height,
            useCustomClose : expandProperties.useCustomClose,
            isModal : expandProperties.isModal
        };
        return property ;
     };
 
     mraid.useCustomClose = function(useCustomClose)
     {
        console.log("useCustomClose");
         if (useCustomClose === undefined || !boolValidator(useCustomClose)){
            mraidbridge.fireErrorEvent('Value of property useCustomClose is invalid.', 'setExpandProperties');
            return;
        }
 
        var property = { "useCustomClose" : useCustomClose };
        mraid.setExpandProperties(property);
     };
 
	 mraid.expand = function(url)
	 {
	 	if (state !== mraidbridge.STATES.DEFAULT && state !== mraidbridge.STATES.RESIZED ) {
	 		 mraidbridge.fireErrorEvent('Ad can only be expanded from the default and resized state. ', 'expand');
	 	}else{
	 		if (url) {
	 			mraidbridge.executeNativeCall("expand", "url", url);
	 		}else{
	 			mraidbridge.executeNativeCall("expand");
	 		}
	 	}
	 };
 
    mraid.setResizeProperties = function(property)
    {
        console.log("setResizeProperties with: " + stringify(property));

        var writableFields = ["width", "height", "customClosePosition","offsetX","offsetY","allowOffscreen"];

        ///validate
        if (!property){mraidbridge.fireErrorEvent('Required object not provided.', 'setResizeProperties'); return;}
        //required
        var width = property["width"];
        if (width === undefined || !uNumberValidator(width)){
            mraidbridge.fireErrorEvent('Value of property width is invalid.', 'setResizeProperties');
            return;}
        //required
        var height = property["height"];
        if (height === undefined || !uNumberValidator(height)){
            mraidbridge.fireErrorEvent('Value of property height is invalid.', 'setResizeProperties');
            return;}

        var offsetX = property["offsetX"];
        if (offsetX !== undefined && !numberValidator(offsetX)){
            mraidbridge.fireErrorEvent('Value of property offsetX is invalid.', 'setResizeProperties');
            return;}

        var offsetY = property["offsetY"];
        if (offsetY !== undefined && !numberValidator(offsetY)){
            mraidbridge.fireErrorEvent('Value of property offsetY is invalid.', 'setResizeProperties');
            return;}
 
        var allowOffscreen = property["allowOffscreen"];
        if (allowOffscreen !== undefined && !boolValidator(allowOffscreen)){
            mraidbridge.fireErrorEvent('Value of property allowOffscreen is invalid.', 'setResizeProperties');
            return;}
 
        var customClosePosition = property["customClosePosition"];
        if (customClosePosition !== undefined && !contains(customClosePosition, RESIZE_PROPERTIES_CUSTOM_CLOSE_POSITION)){
            mraidbridge.fireErrorEvent('Value of property customClosePosition is invalid.', 'setResizeProperties');
            return;}
 
        //set data
        for (wrfield in writableFields)
        {
            var field = writableFields[wrfield];
            if (property.hasOwnProperty(field))
            {
                resizeProperties[field] = property[field];
            }
        }

        var resizePropertiesString = "{\"width\":" + resizeProperties.width + " ,\"height\":" + resizeProperties.height + " ,\"offsetX\":" + resizeProperties.offsetX + " ,\"offsetY\":" + resizeProperties.offsetY + " ,\"allowOffscreen\":" + resizeProperties.allowOffscreen + " ,\"customClosePosition\":\"" + resizeProperties.customClosePosition + "\"}"
 
        mraidbridge.executeNativeCall("setresizeproperties", "property", resizePropertiesString);

    };
 
    mraid.getResizeProperties = function()
    {
        console.log("getResizeProperties");
        var property = {
            width:resizeProperties.width,
            height:resizeProperties.height,
            customClosePosition:resizeProperties.customClosePosition,
            offsetX:resizeProperties.offsetX,
            offsetY:resizeProperties.offsetY,
            allowOffscreen:resizeProperties.allowOffscreen
        };
        return property;
    };
 
    mraid.resize = function(width, height)
    {
        console.log("resize");
    if (state !== mraidbridge.STATES.DEFAULT && state !== mraidbridge.STATES.RESIZED ) 
            mraidbridge.fireErrorEvent('Ad can only be expanded from the default and resized state. ', 'resize');
        else
            mraidbridge.executeNativeCall("resize");
    };
 
     mraid.close = function()
     {
        console.log("close");
        if (state === mraidbridge.STATES.HIDDEN ) {
            mraidbridge.fireErrorEvent('Ad cannot close from the HIDDEN state. ', 'close');
        }else{
            mraidbridge.executeNativeCall("close");
        }
     };
 
    mraid.playVideo = function(url)
    {
        console.log("playVideo");
        if (!url) mraidbridge.fireErrorEvent('url are required.', 'playVideo');
        else mraidbridge.executeNativeCall("playvideo", "url", url);
    };

    mraid.storePicture = function(url)
    {
        console.log("storePicture");
        if (!url) mraidbridge.fireErrorEvent('url are required.', 'storePicture');
        else mraidbridge.executeNativeCall("storepicture", "url", url);
    };

    mraid.createCalendarEvent = function(parameters)
    {
        console.log("createCalendarEvent");
        if (!parameters){
            mraidbridge.fireErrorEvent('parameters are required.', 'createCalendarEvent');
            return;
        }
        var calendarPropertiesString = JSON.stringify(parameters);
        mraidbridge.executeNativeCall("createcalendarevent", "property", calendarPropertiesString);
    };
 
	//////////////////////----------Interactive Video Ads-----------//////////////////////////
 
    var IVideoTrackingEvent = mraidbridge.IVideoTrackingEvent = {
        NONE    : "none",
		LOADING : "loading",
		PLAYING : "playing",
		PAUSE	: "pause",
		ENDED	: "ended",
		CLOSED 	: "closed"
    };
 
    var ivideoCurrentPosition = 0;
    var ivideoDuration=0
    var ivideoTracking = IVideoTrackingEvent.NONE;
 
    mraid.playIVideo = function(url)
    {
        console.log("playivideo");
        if (!url) mraidbridge.fireErrorEvent('url are required.', 'playIVideo');
        else mraidbridge.executeNativeCall("playivideo", "url", url);
    };
    
    mraid.pauseIVideo = function()
    {
        console.log("pauseivideo");
        mraidbridge.executeNativeCall("pauseivideo");
    };
    
    mraid.resumeIVideo = function()
    {
        console.log("resumeivideo");
        mraidbridge.executeNativeCall("resumeivideo");
    }    
    
    mraid.closeIVideo = function()
    {
        console.log("closeivideo");
        mraidbridge.executeNativeCall("closeivideo");
    }
    
    mraid.seekIVideo = function(position)
    {
        console.log("seekivideo");
        if(uNumberValidator(position)){
            var positionString = JSON.stringify(position);
            mraidbridge.executeNativeCall("seekivideo","position",positionString);
        }else
            mraidbridge.fireErrorEvent('position are required.', 'seekivideo');
    }
 
    mraid.muteIVideo = function()
    {
        console.log("muteivideo");
        mraidbridge.executeNativeCall("muteivideo");
    }
    
    mraid.unMuteIVideo = function()
    {
        console.log("unmuteivideo");
        mraidbridge.executeNativeCall("unmuteivideo");
    }
 
     mraid.replayIVideo = function()
     {
        console.log("replayivideo");
        mraidbridge.executeNativeCall("replayivideo");
     }
 
    mraid.getIVideoTracking = function()
    {
        console.log("getIVIdeoTracking");
        return ivideoTracking;
    }    
    
    mraid.getIVideoCurrentPosition = function()
    {
        console.log("getIVideoCurrentPosition");
        return ivideoCurrentPosition;
    }   
        
    mraid.getIVideoDuration = function()
    {
        console.log("getIVideoDuration");
        return ivideoDuration;
    }   
}());



