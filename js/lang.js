var langSpecials = {}; // Some langs have special conditions and stuff - We can use this variable for such.

if(config.lang == "de") {
    function germanFreundlich(myString) {
        if(langSpecials.sie == "sie") {
            switch (myString) {
                case "dein":
                    return "Ihr"
                case "deiner":
                    return "Ihrer"
                case "deines":
                    return "Ihres"
                case "deinem":
                    return "Ihrem"
                case "du":
                    return "Sie"
            }
        }
        return myString;
    }

    langSpecials = {
        "sie": "du" // ["du"|"sie"] // TODO: Make setting / variable
    }

    var lang = { // German (Deutsch)
        "Monday": "Montag",
        "Tuesday": "Dienstag",
        "Wednesday": "Mittwoch",
        "Thursday": "Donnerstag",
        "Friday": "Freitag",
        "Saturday": "Samstag",
        "Sunday": "Sonntag",
        "Displays the current Hour": "Zeigt die aktuelle Stunde an",
        "Displays the current Minute": "Zeigt die aktuelle Minute an",
        "Displays the current Second": "Zeigt die aktuelle Sekunde an",
        "Displays the current Millisecond": "Zeigt die aktuelle Millisekunde an",
        "Displays an entire Clock": "Zeigt eine gesamte Uhr an",
        "Displays the current Day": "Zeigt den aktuellen Tag an",
        "Displays the current Month": "Zeigt den aktuellen Monat an",
        "Displays the current Year": "Zeigt das aktuelle Jahr an",
        "Displays the Name of Today": "Zeigt den Wochentag an",
        "Displays the entire Date": "Zeigt das gesamte Datum an",
        "Displays the Name of your Timezone": "Zeigt den Namen " + germanFreundlich("deiner") + " Zeitzone an",
        "Font color": "Schriftfarbe",
        "Scaling": "Skalierung",
        "Font Size (rem)": "Schriftgröße (rem)",
        "Block Type": "Block Typ"
    }
} else {
    var lang = { // English / Fallback
        "Monday": "Monday",
        "Tuesday": "Tuesday",
        "Wednesday": "Wednesday",
        "Thursday": "Thursday",
        "Friday": "Friday",
        "Saturday": "Saturday",
        "Sunday": "Sunday",
        "Displays the current Hour": "Displays the current Hour",
        "Displays the current Minute": "Displays the current Minute",
        "Displays the current Second": "Displays the current Second",
        "Displays the current Millisecond": "Displays the current Millisecond",
        "Displays an entire Clock": "Displays an entire Clock",
        "Displays the current Day": "Displays the current Day",
        "Displays the current Month": "Displays the current Month",
        "Displays the current Year": "Displays the current Year",
        "Displays the Name of Today": "Displays the Name of Today",
        "Displays the entire Date": "Displays the entire Date",
        "Displays the Name of your Timezone": "Displays the Name of your Timezone",
        "Font color": "Font color",
        "Scaling": "Scaling",
        "Font Size (rem)": "Font Size (rem)",
        "Block Type": "Block Type"
    }
}