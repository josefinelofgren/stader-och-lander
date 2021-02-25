import { displayCityInfo } from "./städer.mjs";

// VARIABLES 
let listCountries = document.getElementById("listCountries");
let listCities = document.createElement("div");
listCities.setAttribute("id", "listCities");
let cityName = document.getElementById("CityName");
let cityInfo = document.getElementById("CityInfo");



// FETCH JSON-FILES 
export let fetchData = Promise.all([
  fetch("json/land.json").then((response) => response.json()),
  fetch("json/stad.json").then((response) => response.json()),
])
.then((data) => {
  console.log("Länder", data[0]);
  console.log("Städer", data[1]);
  printCountries(data);
  printCityInformation(data);
});



// PRINT COUNTRIES IN HEADMENU
export function printCountries(list) {
  let countries = list[0];
  let cities = list[1];

  for (let country in countries) {
    if (countries.hasOwnProperty(country)) {
      document.getElementById("listCountries").insertAdjacentHTML("beforeend","<ul><li class='listCountries' id='" + countries[country].id + "'data-type='country'>" + countries[country].countryname + "</li></ul>");
      listCountries.setAttribute("type", "country");
    }
  }

  // Print cities 
  printCities(cities);
  
}



// PRINT CITIES FOR EACH COUNTRY WHILE CLICKING 
function printCities(cities){

listCountries.addEventListener("click", function (evt) {
  listCountries.appendChild(listCities);

  var type = evt.target.getAttribute("data-type");

  if (type == "country") {
    listCities.innerHTML = "";

    for (let city in cities) {
      if (evt.target.id == cities[city].countryid) {
        listCities.insertAdjacentHTML("beforeend", "<li class='listCities' id='" + cities[city].id + "' value='" + cities[city].population + "'>" + cities[city].stadname + "</li>");
      }
    }
  }
});
}



// PRINT CITY INFORMATION
export function printCityInformation() {
  listCities.addEventListener("click", function (evt) {
    document.getElementById("savedCities").style.display = "none";
    document.getElementById("visitedCity").style.display = "inline-block";
    document.getElementById("viewVisitedCities").style.display = "block";
    evt.stopPropagation();

    // Print city name and population 
    let cityTitle = evt.target.innerHTML;
    let cityPopulation = evt.target.value;

    if (cityPopulation == 0) {
      cityPopulation = "Uppgift saknas!";
    }

    document.getElementById("cityName").innerHTML = "<h1 class='city-name' id=" + evt.target.id + ">" + cityTitle + "</h1>";
    document.getElementById("cityInfo").innerHTML = "<p class='population'> Antal invånare: " + cityPopulation + "</p>";

    // Print weather, img and info
    displayCityInfo(evt.target.id);
  });
}
















// SAVE CITY ID TO LOCAL STORAGE
document.getElementById("visitedCity").addEventListener("click", saveLocalStorage);
export function saveLocalStorage(evt) {

  // Save id of viewed city to variable
  let cityId = document.getElementsByClassName("city-name")[0].id;

  // Save city-id into array 
  let citiesArray;

    if (!localStorage["savedID"]) citiesArray = [];
    else citiesArray = JSON.parse(localStorage["savedID"]);
    localStorage.clear();

    // Push to array if id doesn't already exist in array
    if (citiesArray.includes(cityId)) {
      console.log("property already exists");
    } else {
      citiesArray.push(cityId);
    }

    localStorage.setItem("savedID", JSON.stringify(citiesArray));
  
  }

