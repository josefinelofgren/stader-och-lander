import {saveLocalStorage} from "./huvudmeny.mjs";


// VARIABLES 
let container = document.getElementById('container');
let savedId = localStorage.getItem("savedID");

// Visited cities 
let savedCities = document.getElementById("savedCities");
let totalPop = document.createElement("p");
totalPop.setAttribute ("class", "population");
savedCities.appendChild(totalPop);

export let listCities = document.createElement("ul");
listCities.setAttribute("id", "savedCitiesContainer")
savedCities.appendChild(listCities);





// PRINT VIEW FOR VISITED CITIES 
export function viewVisitedCities(){
    document.getElementById("cityName").innerHTML = "Besökta städer";
    document.getElementById("cityInfo").innerHTML = "";
    savedCities.style.display = "block";
    visitedCities();

    // Hide 
    document.getElementById("visitedCity").style.display = "none";
    document.getElementById("viewVisitedCities").style.display ="none";
}




// FETCH CITIES 
function visitedCities(){
fetch("json/stad.json")
.then(response => response.json())
.then(city => {

    // LocalStorage to array 
    let arrayCity = JSON.parse(localStorage.getItem("savedID"));
    console.log(arrayCity); 

    let totalPopulation = 0;
    listCities.innerHTML = "";

    // For every item in array, log city id, name and population
         for (let i in  arrayCity ){

            for(let c in city ){       
                if(arrayCity[i]==city[c].id){
                    console.log("City", city[c].stadname);
                    console.log("Population",city[c].population);

                    // Count total population of every city in array 
                    totalPopulation = totalPopulation + city[c].population;
                    console.log("Total population",totalPopulation);
                    
                    // Print cities 
                    printCities(city[c].stadname);
            }   
        }
    }

    // Print total population 
    totalPop.innerHTML = "Totalt antal invånare: " + totalPopulation;

    // If localStorage is empty
    ifEmptyLS();
}) 
}





// PRINT STORED CITIES 
function printCities(city){

    // Create li with city name
    let visitedCity = document.createElement("li");
    visitedCity.setAttribute("class", "visited-city")
    visitedCity.innerHTML = city; 

    listCities.appendChild(visitedCity);
}






// IF LOCAL STORAGE IS EMPTY 
function ifEmptyLS(){
    if(localStorage.getItem("savedID") == null){
        document.getElementById("cityName").innerHTML = "Besökta städer";
        document.getElementById("cityInfo").innerHTML = "Listan över besökta städer är tom.";

        // Empty or hide 
        listCities.innerHTML = "";
        totalPop.innerHTML = "";
        document.getElementById("visitedCity").style.display = "none";
    }
}





// CLEAR LOCAL STORAGE
export function clearLS(){
    localStorage.clear();
    ifEmptyLS();
}