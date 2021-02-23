import {displayCityInfo} from "./städer.mjs"

// variabler
let listCountries = document.getElementById("listCountries");
let listCities = document.createElement("div");
listCities.setAttribute("id", "listCities");
let cityName = document.getElementById("CityName");
let cityInfo = document.getElementById("CityInfo");
let cities = document.getElementById("cities");

// fetch json-filer
export let fetchData = Promise.all([
    fetch("json/land.json").then(response => response.json()),
    fetch("json/stad.json").then(response => response.json())
])
    .then(data => {
        console.log("Länder", data[0]);
        console.log("Städer", data[1]);
        printCountries(data);
        printCityInformation(data);
    })

// Funktion för att visa länderna i huvudmenyn

export function printCountries(list) {
    let countries = list[0];
    let cities = list[1];


    for (let country in countries) {
        if (countries.hasOwnProperty(country)) {
            document.getElementById("listCountries").insertAdjacentHTML("beforeend", "<ul><li class='listCountries' id='" + countries[country].id + "'data-type='country'>" + countries[country].countryname + "</li></ul>");
            listCountries.setAttribute("type", "country");
        }
    }

    // När man klickar på någon av länderna så skapas en <li> med dess städer    
    listCountries.addEventListener("click", function (evt) {
        listCountries.appendChild(listCities);
        listCities.innerHTML = "";
        var type = evt.target.getAttribute("data-type");

        if (type == "country") {

            for (let city in cities) {
                if (evt.target.id == cities[city].countryid) {
                    listCities.insertAdjacentHTML("beforeend", "<li class='listCities' id='" + cities[city].id + "' value='" + cities[city].population + "'>" + cities[city].stadname + "</li>");
                }
            }

        }
    });
}

// Funktion för att visa stadsvyn (namn, invånarantal) när man klickar på staden

export function printCityInformation() {

    listCities.addEventListener("click", function (evt) {
        document.getElementById("savedCities").style.display = "none";
        document.getElementById("cities").style.display = "block";
        document.getElementById("visitedCity").style.display = "inline-block";
        
        evt.stopPropagation();
        let cityTitle = evt.target.innerHTML;
        let cityPopulation = evt.target.value;

        displayCityInfo(evt.target.id);

        if (cityPopulation == 0) {
            cityPopulation = "Uppgift saknas!";
        }

        document.getElementById("cityName").innerHTML = ("<h1>" + cityTitle + "</h1>");
        document.getElementById("cityInfo").innerHTML = ("<p class='population'> Antal invånare: " + cityPopulation + "</p>");
        cities.insertAdjacentHTML("afterbegin", "<div class='cityInfo'></div>");
        saveLocalStorage(evt);


    });
}

// Funktion som sparar stadens ID i local storage när man klickar på "besökt"-knappen

export function saveLocalStorage(evt) {

    visitedCity.addEventListener("click", function () {
        let cityId = evt.target.id;

        if (localStorage) {
            let citiesArray;

            if (!localStorage["savedID"]) citiesArray = [];
            else citiesArray = JSON.parse(localStorage["savedID"]);
            
            citiesArray.push(cityId);
            location.reload();

            localStorage.setItem("savedID", JSON.stringify(citiesArray));
        }
    });
}