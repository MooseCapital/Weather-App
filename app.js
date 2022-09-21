let zipinput = document.querySelector(".zipinput");
let search = document.querySelector(".search");
let city = document.querySelector(".city");
let state = document.querySelector(".state");
let temp = document.querySelector(".temp");
let wind = document.querySelector(".wind");
let description = document.querySelector(".description");
let tempsymbol = document.querySelector(".tempsymbol");

search.addEventListener("click", (e) => {
    if (!zipinput.value) {
        zipCodeToCoord();
    } else {
        zipCodeToCoord(zipinput.value);
    }
})


async function zipCodeToCoord(location = 39056) {
    try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${location},US&appid=a200fff5462f3bfa8e2d607ab83cbcc6&units=imperial`, {mode:"cors"});
    let data = await response.json();

    let nameResponse = await fetch( `http://api.openweathermap.org/geo/1.0/reverse?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=a200fff5462f3bfa8e2d607ab83cbcc6`, {mode: "cors"});
    let nameData = await nameResponse.json();
        console.log(data);
        console.log(nameData);

        city.innerText = `${nameData[0].name},`;
        state.innerText = nameData[0].state;

        temp.innerText = Math.round(data.main.temp);
        description.innerText = data.weather[0].description;
        wind.innerText = `${Math.round(data.wind.speed)} MPH`;
        tempsymbol.src = "images/icons8-fahrenheit-symbol-90.png"
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



















