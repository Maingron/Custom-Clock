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
        "DisplaysthecurrentHour": "Zeigt die aktuelle Stunde an",
        "DisplaysthecurrentMinute": "Zeigt die aktuelle Minute an",
        "DisplaysthecurrentSecond": "Zeigt die aktuelle Sekunde an",
        "DisplaysthecurrentMillisecond": "Zeigt die aktuelle Millisekunde an",
        "DisplaysanentireClock": "Zeigt eine gesamte Uhr an",
        "DisplaysthecurrentDay": "Zeigt den aktuellen Tag an",
        "DisplaysthecurrentMonth": "Zeigt den aktuellen Monat an",
        "DisplaysthecurrentYear": "Zeigt das aktuelle Jahr an",
        "DisplaystheNameofToday": "Zeigt den Wochentag an",
        "DisplaystheentireDate": "Zeigt das gesamte Datum an",
        "DisplaystheNameofyourTimezone": "Zeigt den Namen " + germanFreundlich("deiner") + " Zeitzone an",
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
        "DisplaysthecurrentHour": "Displays the current Hour",
        "DisplaysthecurrentMinute": "Displays the current Minute",
        "DisplaysthecurrentSecond": "Displays the current Second",
        "DisplaysthecurrentMillisecond": "Displays the current Millisecond",
        "DisplaysanentireClock": "Displays an entire Clock",
        "DisplaysthecurrentDay": "Displays the current Day",
        "DisplaysthecurrentMonth": "Displays the current Month",
        "DisplaysthecurrentYear": "Displays the current Year",
        "DisplaystheNameofToday": "Displays the Name of Today",
        "DisplaystheentireDate": "Displays the entire Date",
        "DisplaystheNameofyourTimezone": "Displays the Name of your Timezone",
    }
}