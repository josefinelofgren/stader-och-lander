import {displayCityInfo} from "./städer.mjs"

// Variables
let listCountries = document.getElementById("listCountries");
let listCities = document.createElement("div");
listCities.setAttribute("id", "listCities");
let cityName = document.getElementById("CityName");
let cityInfo = document.getElementById("CityInfo");

// Fetch json-files
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

// Print countries in headmenu
export function printCountries(list) {
    let countries = list[0];
    let cities = list[1];


    for (let country in countries) {
        if (countries.hasOwnProperty(country)) {
            document.getElementById("listCountries").insertAdjacentHTML("beforeend", "<ul><li class='listCountries' id='" + countries[country].id + "'data-type='country'>" + countries[country].countryname + "</li></ul>");
            listCountries.setAttribute("type", "country");
        }
    }

    // Show cities while clicking a specific country
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

// Print city information (name, population and info)
export function printCityInformation() {

    listCities.addEventListener("click", function (evt) {
        document.getElementById("savedCities").style.display = "none";
        document.getElementById("visitedCity").style.display = "inline-block";
        
        evt.stopPropagation();
        let cityTitle = evt.target.innerHTML;
        let cityPopulation = evt.target.value;

        if (cityPopulation == 0) {
            cityPopulation = "Uppgift saknas!";
        }

        // Print weather, img and info 
        displayCityInfo(evt.target.id);

        document.getElementById("cityName").innerHTML = ("<h1>" + cityTitle + "</h1>");
        document.getElementById("cityInfo").innerHTML = ("<p class='population'> Antal invånare: " + cityPopulation + "</p>");
 });
}
 
// Funktion som sparar stadens ID i local storage när man klickar på "besökt"-knappen
 
document.getElementById("visitedCity").addEventListener("click", saveLocalStorage);
export function saveLocalStorage(evt) {
 
    let cityId = evt.target.id;
    console.log("Stadens id: " + cityId);
    
    if (localStorage) {
    let citiesArray;
    
    if (!localStorage["savedID"]) citiesArray = [];
    
    else citiesArray = JSON.parse(localStorage["savedID"]);
    localStorage.clear();
    citiesArray.push(cityId);
    
    localStorage.setItem("savedID", JSON.stringify(citiesArray));
    
    }
 };