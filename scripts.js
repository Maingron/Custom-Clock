var clock = document.getElementById("main");
var time = new Date();

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



    if(!myTemplate.getAttribute("description")) {
        myTemplate.setAttribute("description", ""); // Fallback if no description is set so we dont get an ugly "null"
    }
}


for (let myClock1 of config.clock1) { // For every block in config of clock1
    spawnBlock(myClock1);
}

function spawnBlock(which) {
    var newElement = document.createElement("div");
    newElement.style.color = which.color;
    newElement.style.background = which.background;
    newElement.style.top = which.position[1];
    newElement.style.left = which.position[0];
    newElement.style.fontSize = which.fontsize;

    newElement.style.scale = which.scale;

    newElement.innerHTML = document.getElementById(which.block).innerHTML;

    newElement.id = which.id;


    newElement.setAttribute("variables",document.getElementById(which.block).getAttribute("variables"));
    // newElement.id = [i];
    newElement.classList.add("block");
    newElement.setAttribute("template",which.block); // We will access the variables within the template later so we can refresh everything


    // if(newElement.innerHTML.includes("|block-")) {
    //     newElement.classList.add("notick");
    // }

    clock.appendChild(newElement); // Append block to clock frame

}

window.setInterval(function() {
    for(let myElement of document.getElementsByClassName("block")) { // Tick the blocks
        // if(myElement.className)
        var myTempInnerHTML = document.getElementById(myElement.getAttribute("template")).innerHTML;
        for(var j = 0; j < myElement.getAttribute("variables"); j++) {
            myTempInnerHTML = myTempInnerHTML.replace("|" + myTempInnerHTML.split("|")[1] + "|", tick(myTempInnerHTML.split("|")[1])); // Replace variables with actual value
        }

        // console.log(myElement.innerHTML);
        myElement.innerHTML = myTempInnerHTML;
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
        return "<div>" + handleString(document.getElementById(which).innerHTML) + "</div>"; // Take from templates
    } else {
        return which;
    }
}

}



// dev functions
function reset() {
    localStorage.clear();
    document.location.reload();
}

// window.setInterval(function() {
//     document.getElementById("dev-configvalue").innerHTML = JSON.stringify(config);
// },config.ticktime)



if(config.edit == true) {
    document.body.classList.add("editing");
}

clock.style.background = config.background;




function addBlock(which, values = {}) {
    config.clock1[config.clock1.length] = JSON.parse(JSON.stringify(config.dummyblock));
    config.clock1[config.clock1.length - 1].block = which;
    config.clock1[config.clock1.length - 1].id = config.clock1.length - 1;

    console.log(values);

    config.clock1[config.clock1.length - 1] = Object.assign({}, config.clock1[config.clock1.length - 1], values);

    saveConfig();

    console.log(config.clock1[config.clock1.length - 1]);
    spawnBlock(config.clock1[config.clock1.length - 1]);
}



function removeBlock(which) {
    for(var i = parseInt(which.id); i < config.clock1.length; i++) {
        config.clock1[i] = config.clock1[i + 1];
        if(i < config.clock1.length - 1) {
            config.clock1[i].id = i;
        }
        console.log("done for: " + i);
    }
    config.clock1.pop();
    saveConfig();
    which.style.display = "none";
    which.outerHTML = "";
    // config.clock1[config.clock1.length - 1]
}



if(config.clock1.length == 0) { // init
    addBlock("block-fullclock", {"color":"#fff", "position":["100px","100px"]});
    addBlock("block-fulldate", {"color": "#ccc", "position": ["100px","150px"]});
}

