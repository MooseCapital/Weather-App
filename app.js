let zipinput = document.querySelector(".zipinput");
let search = document.querySelector(".search");
let city = document.querySelector(".city");
let state = document.querySelector(".state");
let temp = document.querySelector(".temp");
let wind = document.querySelector(".wind");
let description = document.querySelector(".description");
let tempsymbol = document.querySelector(".tempsymbol");
let videoback = document.querySelector(".videoback");

let clearVideo = "https://www.dropbox.com/s/s8fuhe52abfqxg6/relaxingnatureclear%20%281%29.mp4?raw=1";
let rainVideo = "https://www.dropbox.com/s/udt6u2uhk0haovq/A%20Luxury%20Tokyo%20Hotel%20Room%20Rain%2C%20Wind%20and%20Thunder%20sounds%20For%20Sleeping%204K%208Hrs.webm?raw=1";
let snowVideo = "https://www.dropbox.com/s/ppcsofrnqmlejmp/NYC%20Night%20after%20Snowstorm%20-%20Midtown%20Manhattan%2C%20New%20York%204K.mp4?dl=0";
let thunderstormVideo = "https://www.dropbox.com/s/022me13hjuvoae8/Heavy%20Thunderstorm%20Lightning%20Strikes%20in%20Distance%20Rolling%20Thunder%2C%20Wind%20Rain%20Sounds%20for%20Sleep.mp4?raw=1";
let cloudVideo = "https://www.dropbox.com/s/qgypt6cltlo71t0/Relaxing%20Waves%20On%20A%20Cloudy%20Day%20-%20Sounds%20Of%20Mediterranean%20Sea%20All%20Day%20Long.mp4?raw=1";
let nycVideo = "https://www.dropbox.com/s/7sgp1rpcvz4wps6/NYC%203%20a.m.%20Rain%20-%20Manhattan%2C%20New%20York%204K%20%281%29.mp4?raw=1";


search.addEventListener("click", (e) => {
    if (!zipinput.value) {
        zipCodeToCoord();
    } else {
        zipCodeToCoord(zipinput.value);
    }
})
zipinput.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        // Trigger the button element with a click
        search.click();
    }
});

async function zipCodeToCoord(location = 10006, defaultvid) {
    try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${location},US&appid=a200fff5462f3bfa8e2d607ab83cbcc6&units=imperial`, {mode:"cors"});
    let data = await response.json();

    let nameResponse = await fetch( `https://api.openweathermap.org/geo/1.0/reverse?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=a200fff5462f3bfa8e2d607ab83cbcc6`, {mode: "cors"});
    let nameData = await nameResponse.json();
        console.log(data);
        console.log(nameData);

        if (data.weather[0].main === "Clouds") {
            videoback.src = cloudVideo;
        } else if (data.weather[0].main === "Thunderstorm") {
            videoback.src = thunderstormVideo;
        } else if (data.weather[0].main === "Drizzle") {
            videoback.src = rainVideo;
        } else if (data.weather[0].main === "Rain") {
            videoback.src = rainVideo;
        } else if (data.weather[0].main === "Snow") {
            videoback.src = snowVideo;
        } else if (data.weather[0].main === "Clear") {
            videoback.src = clearVideo;
        }


        city.innerText = `${nameData[0].name},`;
        state.innerText = nameData[0].state;

        temp.innerText = Math.round(data.main.temp);
        description.innerText = data.weather[0].description;
        wind.innerText = `${Math.round(data.wind.speed)} MPH`;
        tempsymbol.src = "images/icons8-fahrenheit-symbol-90.png";

        if (defaultvid) {
            defaultvid();
        }
    } catch (err) {
        console.log(`We have error in getWeather ${err}`);
        city.innerText = "Did Not";
        state.innerText = "Find";
        temp.innerText = "";
        description.innerText = "";
        wind.innerText = "";
        tempsymbol.src = "";
    }
}

function setNYCVideo() {
    videoback.src = nycVideo;
}
zipCodeToCoord(10006, setNYCVideo);
















