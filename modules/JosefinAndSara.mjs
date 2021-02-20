let container = document.getElementById('container');
let totalPopulation = 0;
let savedId = localStorage.getItem("savedID");

export let listCities = document.createElement("ul");
container.appendChild(listCities);

export let totalPop = document.createElement("p");
totalPop.id = "totalPopulation";
container.appendChild(totalPop);

// Visited cities view 
export function viewVisitedCities(){
    console.log(localStorage);
    visitedCities();

    document.getElementById("cityName").innerHTML = "Besökta städer";
    document.getElementById("cityInfo").innerHTML = "";
    document.getElementById("visitedCity").style.visibility = "none";
    document.getElementById("viewVisitedCities").style.visibility = "none";

}


// Fetch cities 
function visitedCities(){
fetch("json/stad.json")
.then(response => response.json())
.then(city => {
    console.log(city);
    checkId(savedId, city);
}) 
}


// Check Id of local storage with cities Id 
function checkId(savedId, city){
         for (let i in savedId ){
            console.log("VisitedCityId",savedId[i]);
            
            for(let c in city ){       
                if(savedId[i]==city[c].id){

                    console.log("Id", city[c].id);
                    console.log("Population",city[c].population);
                    console.log("City", city[c].stadname);
                    
    countTotalPopulation(city[c].population);
    printCities(city[c].stadname);

            }   
        }
    }

    printTotalPopulation();
}

// Print stored citites 
function printCities(city){
    let li = document.createElement('li');
    li.innerHTML = city; 
    
    listCities.appendChild(li);
}
    

// Count total population of citites
function countTotalPopulation(population){
    totalPopulation =+ population;
    console.log("Total population:", totalPopulation);
}


// Print total population of citites
function printTotalPopulation(){
    totalPop.innerHTML = "Totalt antal invånare: " + totalPopulation;

    if(localStorage.getItem("savedID") == null){
        listCities.innerHTML = "Listan över besökta städer är tom."
        totalPop.innerHTML = "";
    }
}


export function clearLS(){
    localStorage.clear();

    if(localStorage.getItem("savedID") == null){
        listCities.innerHTML = "Listan över besökta städer är tom."
        totalPop.innerHTML = "";
    }
}
