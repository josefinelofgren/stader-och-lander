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
        printPopulation(data);
        // printCities(data);
    })


// Funktion för att skriva ut länder i huvudmenyn

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
                // console.log(cities[city].stadname);
                listCities.insertAdjacentHTML("beforeend", "<li>" + cities[city].stadname + "</li>");
                console.log(cities[city].population);
            }

        }

    });
}

// Klickar på städerna så visas Stadvyn
listCities.addEventListener("click", function (evt) {
    console.log("click1");
    cityTitle = evt.target.innerHTML;
    console.log(cityTitle);
    document.getElementById("cityName").innerHTML = ("<h1>" + cityTitle + "</h1>");
        printPopulation();
})

// Visar antal invånare
function printPopulation(list) {
    let cities = list[1];
    for (let city in cities) {
        document.getElementById("cityInfo").innerHTML = ("<p> Antal invånare: " + cities[city].population + "</p>");
    }
}













