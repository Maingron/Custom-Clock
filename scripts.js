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
},100)