let savedCities = document.getElementById("savedCities");
let container = document.getElementById('container');
let savedId = localStorage.getItem("savedID");

export let totalPop = document.createElement("p");
totalPop.setAttribute ("class", "population");
savedCities.appendChild(totalPop);

export let listCities = document.createElement("ul");
listCities.setAttribute("id", "SavedCitiesContainer")
savedCities.appendChild(listCities);


// Visited cities view 
export function viewVisitedCities(){
    console.log(localStorage);
    visitedCities();

    document.getElementById("cityName").innerHTML = "Besökta städer";
    document.getElementById("cityInfo").innerHTML = "";
    document.getElementById("visitedCity").style.display = "none";
    document.getElementById("viewVisitedCities").style.display ="none";
    savedCities.style.display = "block";
}

// Fetch cities 
function visitedCities(){
fetch("json/stad.json")
.then(response => response.json())
.then(city => {
    console.log(city);

    // LocalStorage to array 
    let arrayCity = JSON.parse(localStorage.getItem("savedID"));
    console.log(arrayCity); 

    let totalPopulation = 0;

    // For every item in array, log city id, name and population
         for (let i in  arrayCity ){
            console.log("VisitedCityId",parseInt(arrayCity[i]) );

            for(let c in city ){       
                if(arrayCity[i]==city[c].id){
                    console.log("Id", city[c].id);
                    console.log("Population",city[c].population);
                    console.log("City", city[c].stadname);

                    // Count total population of every city in array 
                    totalPopulation = totalPopulation + city[c].population;
                    console.log(totalPopulation);
                    
                    // Print cities 
                    printCities(city[c].stadname);

            }   
        }
    }

    // Print total population 
    totalPop.innerHTML = "Totalt antal invånare: " + totalPopulation;

    ifEmptyLS();
}) 
}


// Print stored citites 
function printCities(city){
    listCities.innerHTML = "";
    
    let savedCities = document.createElement('li');
    savedCities.setAttribute('class', 'saved-cities')
    savedCities.innerHTML = city; 
    
    listCities.appendChild(savedCities);
}


// If localStorage is empty 
function ifEmptyLS(){
    if(localStorage.getItem("savedID") == null){

        listCities.innerHTML = "Listan över besökta städer är tom."
        totalPop.innerHTML = "Totalt antal invånare: 0";
    }
}


// Clear localStorage
export function clearLS(){
    localStorage.clear();
    ifEmptyLS();
}