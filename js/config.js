var config = {};
if(localStorage.getItem("config1")) {
    console.log("Config found");
    config = loadConfig();


} else {
    console.log("Config not found; Creating new config");



    config = { // Fallback / Template config
        // general settings
        "editticktime": (1000 / 2), // ms
        "prodticktime": (1000 / 60), // ms
        "ticktime": config.prodticktime, // ms
        "background": "#000", // Background Color of the entire clock
        "lang": navigator.language.toLowerCase(), // Language

        "dummyblock": { // Dummy block - will be used when adding a new Block
            "block": "", // Block Name (Example: block-hours) (DUMMY)
            "color": "#ffff00", // Font color
            "background": "transparent", // Block background color
            "fontsize": "2rem", // Font size
            "position": ["32px","70px"], // Position of the block // [x,y]
            "id": 9999 // nth block (DUMMY)
        },

        // clocks
        "clock1": [
        ]
    }

    saveConfig("config1", config);
}


if(config.edit == true) { // Ensure editing pleasure
    config.ticktime = config.editticktime;
} else {
    config.ticktime = config.prodticktime;
}


function loadConfig() {
    return JSON.parse(localStorage.getItem("config1"));
}

function saveConfig(which, value) {
    // Ignore any parameters for now
    // TODO: Don't ignore parameters
    localStorage.setItem("config1", JSON.stringify(config));
}