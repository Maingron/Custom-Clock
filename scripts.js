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
        "background": "#000",

        // clocks
        "clock1": [
            {
                "block": "block-fulldate",
                "color": "#ffff00",
                "background": "transparent",
                "fontsize": "2rem",
                "position": ["2rem","4.5rem"], // [x,y]
            },
            {
                "block": "block-fullclock",
                "color": "#ff0000",
                "background": "transparent",
                "fontsize": "2.5rem",
                "position": ["2rem","2rem"], // [x,y]
            }
        ]
    }


    saveConfig("config1", config);
}

// Modify templates
var templates = document.getElementsByTagName("template");
for(let myTemplate of templates) {
    var charOccs = 0;
    for(var i = 0; i < myTemplate.innerHTML.length; i++) {
        if(myTemplate.innerHTML[i] == "|") {
            charOccs++;
        }
    }

    myTemplate.setAttribute("variables",charOccs / 2); // half because every variable has 2
}


for (let myClock1 of config.clock1) { // For every block in config of clock1

    var newElement = document.createElement("div");
    newElement.style.color = myClock1.color;
    newElement.style.background = myClock1.background;
    newElement.style.top = myClock1.position[1];
    newElement.style.left = myClock1.position[0];
    newElement.style.fontSize = myClock1.fontsize;

    newElement.innerHTML = document.getElementById(myClock1.block).innerHTML;

    newElement.setAttribute("variables",document.getElementById(myClock1.block).getAttribute("variables"));
    // newElement.id = [i];
    newElement.classList.add("block");
    newElement.setAttribute("template",myClock1.block); // We will access the variables within the template later so we can refresh everything

    clock.appendChild(newElement); // Append block to clock frame
}

window.setInterval(function() {
    for(let myElement of document.getElementsByClassName("block")) { // Tick the blocks
        myElement.innerHTML = document.getElementById(myElement.getAttribute("template")).innerHTML;
        for(var j = 0; j < myElement.getAttribute("variables"); j++) {
            myElement.innerHTML = myElement.innerHTML.replace("|" + myElement.innerHTML.split("|")[1] + "|", tick(myElement.innerHTML.split("|")[1])); // Replace variables with actual value
        }
    }

    time = new Date();
}, config.ticktime)


function handleString(whichString) {
    for(var j = 0; j < whichString.split("|").length; j++) {
        whichString = whichString.replace("|" + whichString.split("|")[1] + "|", tick(whichString.split("|")[1])); // Replace variables with actual value
    }
    return whichString;
}

function tick(which) {
    if(which == "hours") {
        return time.getHours();
    } else if(which == "minutes") {
        return time.getMinutes();
    } else if(which == "seconds") {
        return time.getSeconds();
    } else if(which == "day") {
        return time.getDay();
    } else if(which == "month") {
        return time.getMonth();
    } else if(which == "year") {
        return time.getFullYear();
    } else if(which.includes("block-")) {
        return handleString(document.getElementById(which).innerHTML); // Take from templates
    } else {
        return which;
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

document.body.style.background = config.background;