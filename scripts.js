var config = {};
var clock = document.getElementById("main");
var time = new Date();



if(localStorage.getItem("config1")) {
    console.log("Config found");
    config = loadConfig();
} else {
    console.log("Config not found; Creating new config");

    config = { // Fallback / Template config
        // general settings
        "ticktime": 100, // ms

        // clocks
        "clock1": [
            {
                "block": "block-hours",
                "color": "#ffff00",
                "background": "#000",
                "position": [100,150,-1,-1], // [x,y,unused (-1),unused (-1)] // TODO: Calc size with [x1,y1,x2,y2]
            },
            {
                "block": "block-minutes",
                "color": "#ffff00",
                "background": "#000",
                "position": [130,150,-1,-1], // [x,y,unused (-1),unused (-1)] // TODO: Calc size with [x1,y1,x2,y2]
            },
            {
                "block": "block-seconds",
                "color": "#ff0000",
                "background": "#000",
                "position": [160,150,-1,-1], // [x,y,unused (-1),unused (-1)] // TODO: Calc size with [x1,y1,x2,y2]
            }
        ]
    }


    saveConfig("config1", config);
}


for (let myClock1 of config.clock1) { // For every block in config of clock1

    var newElement = document.createElement("div");
    newElement.style.color = myClock1.color;
    newElement.style.background = myClock1.background;
    newElement.style.top = myClock1.position[1] + "px";
    newElement.style.left = myClock1.position[0] + "px";
    newElement.innerHTML = document.getElementById(myClock1.block).innerHTML;
    // newElement.id = [i];
    newElement.classList.add("block");

    if(newElement.innerHTML.includes("|")) { // Check if we have to update the block regularly
        newElement.classList.add("tick");
        newElement.setAttribute("tick",newElement.innerHTML.split("|")[1].split("|")[0]);
    }

    clock.appendChild(newElement); // Append block to clock frame
}

var tickingElements = document.getElementsByClassName("tick");

window.setInterval(function() {
    for(let myTElement of tickingElements) { // Tick the blocks
        myTElement.innerHTML = tick(myTElement.getAttribute("tick"));
    }

    time = new Date();
}, config.ticktime)

function tick(which) {
    if(which == "hours") {
        return time.getHours();
    } else if(which == "minutes") {
        return time.getMinutes();
    } else if(which == "seconds") {
        return time.getSeconds();
    }
}

function loadConfig() {
    return JSON.parse(localStorage.getItem("config1"));
}

function saveConfig(which, value) {
    localStorage.setItem("config1", JSON.stringify(value));
}



// dev functions
function reset() {
    localStorage.clear();
    document.location.reload();
}

window.setInterval(function() {
    document.getElementById("dev-configvalue").innerHTML = JSON.stringify(config);
},config.ticktime)