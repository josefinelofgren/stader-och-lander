let listCountries = document.getElementById("listCountries");
let listCities = document.createElement("listCities");
let cityName = document.getElementById("CityName");
let cityInfo = document.getElementById("CityInfo");

Promise.all([
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

function printCountries(list) {

    let countries = list[0];
    let cities = list[1];

    for (let country in countries) {
        if (countries.hasOwnProperty(country)) {
            // console.log(countries[country].countryname);
            document.getElementById("listCountries").insertAdjacentHTML("beforeend", "<ul><li id='" + countries[country].id + "'>" + countries[country].countryname + "</li></ul>");
        }
    }

    // När man klickar på någon av länderna så skapas en <li> med dess städer    

    listCountries.addEventListener("click", function (evt) {
        listCountries.appendChild(listCities);
        listCities.innerHTML = "";

        for (let city in cities) {

            if (evt.target.id == cities[city].countryid) {
                listCities.insertAdjacentHTML("beforeend", "<li id='" + cities[city].stadname.id + "'>" + cities[city].stadname  + "</li>");
            }

        }

    });
}

// Funktion för att visa stadsvyn (namn, invånarantal) när man klickar på staden

function printCityInformation(list) {

    let cities = list[1];

    listCities.addEventListener("click", function(evt) {

        cityTitle = evt.target.innerHTML;
        console.log(cityTitle);

        for (let people in cities) {

            if (cityTitle.hasOwnProperty(people)) {
                cityPopulation = cities[people].population;
            }
        }

        document.getElementById("cityName").innerHTML = ("<h1>" + cityTitle + "</h1>");
        document.getElementById("cityInfo").innerHTML = ("<p> Antal invånare: " + cityPopulation + "</p>");

    });
}












