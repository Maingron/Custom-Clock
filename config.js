var config = {};
if(localStorage.getItem("config1")) {
    console.log("Config found");
    config = loadConfig();

    if(config.edit == true) { // Ensure editing pleasure
        config.ticktime = config.editticktime;
    } else {
        config.ticktime = config.prodticktime;
    }

} else {
    console.log("Config not found; Creating new config");



    config = { // Fallback / Template config
        // general settings
        "editticktime": (1000 / 10), // ms
        "prodticktime": (1000 / 60), // ms
        "ticktime": config.prodticktime, // ms
        "background": "#000",
        "lang": "en",

        "dummyblock": {
            "block": "",
            "color": "#ffff00",
            "background": "transparent",
            "fontsize": "2rem",
            "position": ["2rem","4.5rem"], // [x,y]
            "scale": 1,
            "id": 9999
        },

        // clocks
        "clock1": [
        ]
    }

    saveConfig("config1", config);
}





function loadConfig() {
    return JSON.parse(localStorage.getItem("config1"));
}

function saveConfig(which, value) {
    // Ignore any parameters for now
    // TODO: Don't ignore parameters
    localStorage.setItem("config1", JSON.stringify(config));
}