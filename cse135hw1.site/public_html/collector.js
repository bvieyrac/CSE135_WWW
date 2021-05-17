/* vairables - static data */
var userAgent;
var userLang;
var cookieEnabled;
var isImageEnabled;
var isCSSEnabled;
var screenHeight;
var screenWidth;
var windowHeight;
var windowWidth;
var connectionType;

/* Performance Variables */
var timingObject;
var pageStartedLoadingTime;
var pageEndedLoadingTime;
var loadTime;

/* Activity Variables */
var x_coord;
var y_coord;
var cursorPos = [];
var mouseKeys = [];
var mouseCoords = [];
var numClicks = 0;
var scrollCoords = [];

/* Keyboard activity variables */
var keynums = [];
var isIdled;
var idleStartTime;       // one instance of idleStartTime
var idleStartTimes = [];

var reActiveTime;        // one instance of break ended time
var reActiveTimes = [];  // break ended times

var userIdleTime;
var userIdleTimes = [];

/* Other */
var userEnteredTime;
var userLeftTime;
var userLastPage;

/* cookie */
var userCookie;

// TODO: last page and left time

// Onload function
function dataCollectOnLoad(){

            /* Set Session Cookie */
            document.cookie = `uniqueID=${Date.now()}`;
            let cookiesObject = document.cookie
                        .split(';')
                        .map((c) => c.split('='))
                        .reduce((accumulator, [key, value]) =>
                                    ({...accumulator, [key.trim()]: decodeURIComponent(value) }),
                        {});
            userCookie = cookiesObject.uniqueID;
            console.log(`userCookie = ${userCookie}`);


            /* Static Data */
            console.log("Onload function called haha\n");
            // (1) user agent
            console.log(`userAgent = ${navigator.userAgent}`);
            userAgent = navigator.userAgent;

            // (2) user language
            console.log(`userLang = ${navigator.language}`);
            userLang = navigator.language;

            // (3) if the user accepts cookies
            console.log(`cookieEnabled = ${navigator.cookieEnabled}`);
            cookieEnabled = navigator.cookieEnabled;

            // (4) if the user allows JavaScript (you will have to manually figure this one out)
                        // We did it in PHP [Check index.html <noscript><iframe src="tracker.php"/></noscript>

            // (5) if the user allows images  (you will have to manually figure this one out)
            var image = document.getElementById("testImage");
            isImageEnabled = image.complete && image.naturalHeight !== 0;
            console.log(`imageIsLoaded = ${isImageEnabled}`);

            // (6) if the user allows CSS (you will have to manually figure this one out)
                        // Using the id="testCSS" element to see if an element has color set by the CSS
            var ele = document.getElementById("testCSS");
            var cssMargin = window.getComputedStyle(ele, null).getPropertyValue("margin");
            console.log(`cssMargin = ${cssMargin}`);
            isCSSEnabled = cssMargin === "10px" ? true : false;
            console.log(`isCSSEnabled was set to => ${isCSSEnabled}`)

            // (7) User's screen dimensions
            console.log(`screen height = ${window.screen.height}`);
            screenHeight = window.screen.height;
            console.log(`screen width = ${window.screen.width}`);
            screenWidth = window.screen.width;


            // (8) User's window dimensions
            console.log(`window height = ${window.innerHeight}`);
            windowHeight = window.innerHeight;
            console.log(`window width = ${window.innerWidth}`);
            windowWidth = window.innerHeight;

            // (9) User's network connection type
            console.log(`connection type = ${navigator.connection.effectiveType}`);
            connectionType = navigator.connection.effectiveType;

            /* Performance Data */
            // (10) The whole timing object
            console.log("Timing Object:")
            console.log(window.performance.timing);
            timingObject = window.performance.timing;

            // (11) Specifically when the page started loading (below is in millisecond)
                        // Btw, it is navigationStart that is actually the beginning
            console.log(`Time when page started loading = ${window.performance.timing.navigationStart}`);
            pageStartedLoadingTime = window.performance.timing.navigationStart;

            // (12) Specifically when the page ended loading (below is in ms)
            console.log(`Time when page finished loading = ${window.performance.timing.domContentLoadedEventEnd}`);
            pageEndedLoadingTime = window.performance.timing.domContentLoadedEventEnd;

            // (13) The total load time (manually calculated - in milliseconds)
            console.log(`Load time = ${window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart}`);
            loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;


            /* Activity */
            // ** All mouse activity **
            // (14) Cursor positions (coordinates)
            function getCursorCoords(event){
                        x_coord = event.clientX;
                        y_coord = event.clientY;
                        cursorPos.push([x_coord, y_coord]);
            }
            window.onmousemove = getCursorCoords;
            setInterval(function() {
                        console.log(`X coord: ${x_coord}, Y coord: ${y_coord}`);
            },3000);

            // (15) Clicks (and which mouse button it was)
            function getMouseClick(event){
                        let curMouseKey = event.button;
                        mouseKeys.push(curMouseKey);
                        mouseCoords.push([event.clientX, event.clientY]);
                        numClicks++;
                        if(curMouseKey === 0) console.log(`${curMouseKey}: left mouse click`);
                        else if(curMouseKey === 1) console.log(`${curMouseKey}: middle mouse click`);
                        else if(curMouseKey === 2) console.log(`${curMouseKey}: right mouse click`);
            }
            window.onmousedown = getMouseClick;

            // (16) Scrolling (coordinates of the scroll)
            function getScrollPos(){
                        return window.scrollY;
            }
            setInterval(() => {
                        curScrollCoord = getScrollPos();
                        scrollCoords.push(curScrollCoord);
                        console.log(`Scroll Position = ${curScrollCoord}`)
            }, 3000);

            // ** All keyboard activity **
            // (17) Key down or Key up events
            function getKeyPressed(event){
                        curKey = event.which;
                        keynums.push(curKey);
                        console.log(`'${String.fromCharCode(curKey)}' pressed`);
            }
            window.onkeydown = getKeyPressed;

            // (18) ** Any idle time where no activity happened for a period of 2 or more seconds **
            // (19) Record when the break ended
            // (20) Record how long it lasted (in milliseconds)
            isIdled = false;
            function idleTime(){
                        // time that will be incremented by setTimeout below
                        var time;
                        // events that will signal that users aren't idled anymore
                        let events = ['load', 'mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
                        events.forEach(function(name) {
                                    window.addEventListener(name, resetTime, true);
                        });

                        function resetTime(){
                                    if(isIdled === true) {
                                                // Get time when user returned from being idled [(19) Record when the break ended]
                                                reActiveTime = Date.now();
                                                // array to store all break ended times
                                                reActiveTimes.push(reActiveTime);

                                                // How long user was idled [(20) Record how long it lasted (in milliseconds)]
                                                userIdleTime = reActiveTime - idleStartTime;
                                                // array to store all userIdleTimes
                                                userIdleTimes.push(userIdleTime);

                                                const reActiveTimeObject = new Date(reActiveTime);
                                                console.log(`Break Ended @ ${reActiveTimeObject.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})}`);
                                                console.log(`Break Lasted for ${userIdleTime} milliseconds | ${userIdleTime/1000} seconds`);
                                                // update idle status
                                                isIdled = false;
                                    }
                                    
                                    // reset Timer
                                    clearTimeout(time);
                                    // Call handleIdle() when 2 seconds has passed [(18) Any idle time where no activity happened for a period of 2 or more seconds]
                                    time = setTimeout(() => handleIdle(), 2000);
                        }

                        function handleIdle(){
                                    // current idle start time
                                    idleStartTime = Date.now();
                                    // array to store all idleStartTime
                                    idleStartTimes.push(idleStartTimes);

                                    isIdled = true;
                                    console.log("User is IDLE")
                        }
            }
            idleTime();

            // (21) When the user entered the page
            userEnteredTime = window.performance.timing.connectStart
            const enteredDateObject = new Date(userEnteredTime);
            console.log(`User entered the page @ ${enteredDateObject.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})}`);
            // (22) When the user left the page
            // (23) Which page the user was on
            async function handleLeavingPage(event) {
                        userLeftTime = timingObject.connectEnd;
                        console.log(`User left the page @ ${userLeftTime}`);
                        
                        userLastPage = document.location.href;
                        console.log(`User was on ${userLastPage}`);

                        const activityData = {
                                    userLeftTime: userLeftTime,
                                    userLastPage: userLastPage
                        };
                        
                        /* send user left page data */
                        await fetch(`https://www.cse135hw1.site/api/activity/${userCookie}`,{
                                    method: 'PUT',
                                    headers: {
                                                'Content-Type': 'application/json',
                                                'Authentication': 'Basic ' + btoa('timo' + ":" + 'timo123'),
                                    },
                                    body: JSON.stringify(activityData),
                        })
                        .then(response => response)
                        .then(sentData => {
                                    console.log("DATA SENT!", sentData);
                        })
                        .catch(error => {
                                    console.log("Error, data not sent:", error);
                        });
            }
            window.onunload = handleLeavingPage;
            window.onbeforeunload = handleLeavingPage;
}

/* Collect data */
window.onload = dataCollectOnLoad;

/* Send data to server if one of the following conditions is satisfied */
// (1) Send Data every 5 seconds

setInterval(sendData, 10000);

// initial call
// setTimeout(sendData, 1000);

function sendData(){
            // TODO: Make separate calls to static, performance, and activity
            const staticData = {
                        /* vairables - static data */
                        userCookie: userCookie,
                        userAgent: userAgent,
                        userLang: userLang,
                        cookieEnabled: cookieEnabled,
                        isImageEnabled: isImageEnabled,
                        isCSSEnabled: isCSSEnabled,
                        screenHeight: screenHeight,
                        screenWidth: screenWidth,
                        windowHeight: windowHeight,
                        windowWidth: windowWidth,
                        connectionType: connectionType
            }

            const performanceData = {
                        userCookie: userCookie,
                        timingObject: timingObject,
                        pageStartedLoadingTime: pageStartedLoadingTime,
                        pageEndedLoadingTime: pageEndedLoadingTime,
                        loadTime: loadTime
            }

            const activityData = {
                        /* Activity Variables */
                        userCookie: userCookie,
                        cursorPos: cursorPos,
                        mouseKeys: mouseKeys,
                        mouseCoords: mouseCoords,
                        numClicks: numClicks,
                        scrollCoords: scrollCoords,  
                        userEnteredTime: userEnteredTime,
                        userLeftTime: userLeftTime,
                        userLastPage: userLastPage,
                        /* Keyboard activity variables */
                        keynums: keynums,
                        idleStartTime: idleStartTime,       //none
                        reActiveTimes: reActiveTimes,
                        userIdleTimes: userIdleTimes
            }

            /* send static data */
            fetch('https://www.cse135hw1.site/api/static',{
                        method: 'POST',
                        headers: {
                                    'Content-Type': 'application/json',
                                    'Authentication': 'Basic ' + btoa('timo' + ":" + 'timo123'),
                        },
                        body: JSON.stringify(staticData),
                        // keepalive: true
            })
            .then(response => response)
            .then(sentData => {
                        console.log("DATA SENT!", sentData);
            })
            .catch(error => {
                        console.log("Error, data not sent:", error);
            });

            /* send performance data */
            fetch('https://www.cse135hw1.site/api/performance',{
                        method: 'POST',
                        headers: {
                                    'Content-Type': 'application/json',
                                    'Authentication': 'Basic ' + btoa('timo' + ":" + 'timo123'),
                        },
                        body: JSON.stringify(performanceData),
                        // keepalive: true
            })
            .then(response => response)
            .then(sentData => {
                        console.log("DATA SENT!", sentData);
            })
            .catch(error => {
                        console.log("Error, data not sent:", error);
            });

            /* send performance data */
            fetch('https://www.cse135hw1.site/api/activity',{
                        method: 'POST',
                        headers: {
                                    'Content-Type': 'application/json',
                                    'Authentication': 'Basic ' + btoa('timo' + ":" + 'timo123'),
                        },
                        body: JSON.stringify(activityData),
                        // keepalive: true
            })
            .then(response => response)
            .then(sentData => {
                        console.log("DATA SENT!", sentData);
            })
            .catch(error => {
                        console.log("Error, data not sent:", error);
            });

            // send data
            // fetch('https://www.cse135hw1.site/json/posts',{
            //             method: 'POST',
            //             headers: {
            //                         'Content-Type': 'application/json',
            //                         'Authentication': 'Basic ' + btoa('timo' + ":" + 'timo123'),
            //             },
            //             body: JSON.stringify(data),
            //             // keepalive: true
            // })
            // .then(response => response.json())
            // .then(sentData => {
            //             console.log("DATA SENT!", sentData);
            // })
            // .catch(error => {
            //             console.log("Error, data not sent:", error);
            // });

}

// (2) User close the browser/page
// function sendDataClosePage(){
//             sendData();
// }

// window.onunload = sendDataClosePage;