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