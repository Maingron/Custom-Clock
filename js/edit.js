if(config.edit == true) { // Only load edit tools if we want to edit
    var mousePos = [0,0,0,0]; // [x,y,relativeX,relativeY]
    var mouseClick = false; // If mouse is down
    var mouseDrag = null; // Block to drag
    var mouseResize = null; // Block to resize

    window.setTimeout(function() { // Make sure we don't end up with this pasted everywhere by waiting until everything else is rendered
        for(let myTemplate of templates) {
            myTemplate.innerHTML = document.getElementById("block-edit").innerHTML + myTemplate.innerHTML;
        }
    }, config.ticktime);

    function drag(which) {
        if(mouseClick == true) {
            which.style.left = mousePos[0] + "px";
            which.style.top = mousePos[1] + "px";
            // which.style.top = mousePos[1] - (which.offsetHeight / 2) + "px";

            if(which.id) {
                config.clock1[which.id].position = [which.style.left, which.style.top];
            }

        }
    }

    function resize(which,direction) {
        if(direction == "bigger") {
            which.style.scale = +which.style.scale + .1;
        } else if(direction == "smaller") {
            which.style.scale = +which.style.scale - .1;
        }

        if(which.id) {
            config.clock1[which.id].scale = which.style.scale;
        }
    }

    function handleAction(whichType, applyTo, event) {

        // mousePos[2] = event.mouse
        mousePos[2] = event.screenX;
        mousePos[3] = event.screenY;
        // console.log(mousePos);
        if(whichType == "drag") {
            // console.log(event);
            mouseDrag = applyTo;
            drag(applyTo);
        } else if (whichType == "resize") {
            mouseResize = applyTo;
            if(event.srcElement.classList.contains("smaller")) {
                resize(applyTo, "smaller");
            } else if(event.srcElement.classList.contains("bigger")){
                resize(applyTo, "bigger");
            }
        } else if (whichType == "move") {
            if(mouseDrag != null) {
                drag(mouseDrag);
            }

            if(mouseResize != null) {
                resize(mouseResize);
            }
        }
        saveConfig();
    }

    var designerApplyTo;

    function setDesigner(which) {
        document.getElementById("designer").disabled = false;
        document.getElementById("designer-fontcolor").value = config.clock1[which.id].color;
        document.getElementById("designer-scale").value = config.clock1[which.id].scale;
        document.getElementById("designer-fontsize").value = parseInt(config.clock1[which.id].fontsize);
        document.getElementById("designer-block").value = config.clock1[which.id].block;
        console.log(which);
        designerApplyTo = which.id;

        // document.getElementById("designer").style.left = config.clock1[designerApplyTo].position[0];
        // document.getElementById("designer").style.top = -60 + parseInt(config.clock1[designerApplyTo].position[1]) + "px";
    }

    function designer(key, value) {
        config.clock1[designerApplyTo][key] = value;

        document.getElementById(designerApplyTo).outerHTML = ""; // Despawn
        spawnBlock(config.clock1[designerApplyTo]); // Respawn

        saveConfig();

    }






    document.addEventListener("mousemove", function(event) {
        mousePos[0] = event.clientX;
        mousePos[1] = event.clientY;
        handleAction("move", "", event);
        // if(mouseDrag != null) {
        //     drag(mouseDrag);
        // } else if(mouseResize != null) {
        //     resize(mouseResize);
        // }
    })

    document.addEventListener("mouseup", function() {
        mouseClick = false;
        mouseDrag = null;
        mouseResize = null;
    })

    document.addEventListener("mousedown", function() {
        mouseClick = true;
    })


    for(myTemplate of templates) {
        console.log(myTemplate.innerHTML);
        if(!myTemplate.classList.contains("ignore")) {
            document.getElementById("designer-block").innerHTML += "<option value='" + myTemplate.id + "'>" + myTemplate.id + "&nbsp;&nbsp;&nbsp;"+myTemplate.getAttribute("description")+"&nbsp;&nbsp;&nbsp;<code>" + myTemplate.innerHTML + "</code></option>";

        }
    }
}