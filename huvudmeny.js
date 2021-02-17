let listCountries = document.getElementById("listCountries");
let listCities = document.createElement("listCities");

Promise.all([
    fetch("json/land.json").then(response => response.json()),
    fetch("json/stad.json").then(response => response.json())
])
    .then(data => {
        console.log("Länder", data[0]);
        console.log("Städer", data[1]);
        printCountries(data);
        printCities(data);
    })

// Funktion för att skriva ut länder i huvudmenyn

function printCountries(list) {

    let countries = list[0];
    for (let country in countries) {
        if (countries.hasOwnProperty(country)) {
            console.log(countries[country].countryname);
            document.getElementById("listCountries").insertAdjacentHTML("beforeend", "<ul>" + countries[country].countryname + "</ul>");
        }  
    }
}

// Lista med städerna
function printCities(list) {
    let cities = list[1];
    let countries = list[0];
    console.log(countries);
    for (let city in cities) {
        if (cities[city].countryid == 2){
        console.log(cities[city].stadname);
        listCities.insertAdjacentHTML("beforeend", "<li>" + cities[city].stadname + "</li>");
    }
    }
}

// När man klickar på någon av länderna så aktiveras printCities()
listCountries.addEventListener("click", function () {
    listCountries.appendChild(listCities);
    console.log("click");
});







