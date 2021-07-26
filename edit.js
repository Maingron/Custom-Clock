var mousePos = [0,0,0,0]; // [x,y,relativeX,relativeY]
var mouseClick = false; // If mouse is down
var mouseDrag = null; // Block to drag
var mouseResize = null; // Block to resize
for(let myTemplate of templates) {
    myTemplate.innerHTML = document.getElementById("block-edit").innerHTML + myTemplate.innerHTML;
}


// dragging
// for(let myBlock of document.getElementsByClassName("editdiv")) {
//     console.log("nabend");
//     myBlock.addEventListener("mousedown", function() {
//         mouseDrag = this.parentElement; // Block to drag
//         console.log(mouseDrag);
//     })
// }

function drag(which) {
    if(mouseClick == true) {
        which.style.left = mousePos[0] + "px";
        which.style.top = mousePos[1] + "px";
        // which.style.top = mousePos[1] - (which.offsetHeight / 2) + "px";
    }
}

function resize(which) {
    if(mouseClick == true) {
        which.style.scale = mousePos[0] / 100;
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
        resize(applyTo);
    } else if (whichType == "move") {
        if(mouseDrag != null) {
            drag(mouseDrag);
        }

        if(mouseResize != null) {
            resize(mouseResize);
        }
    }
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