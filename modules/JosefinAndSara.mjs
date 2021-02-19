let container = document.getElementById('container');
let totalPopulation = 0;
let savedId = localStorage.getItem("savedID");

// Visited cities view 
export function viewVisitedCities(){
    console.log(localStorage);
    visitedCities();

    document.getElementById("cityName").innerHTML = "Besökta städer";
    document.getElementById("cityInfo").innerHTML = "";
    document.getElementById("visitedCity").style.visibility = "hidden";

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
                    console.log("Id",city[c].id);
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
    let listCities = document.createElement("ul");
    container.appendChild(listCities);

    listCities.insertAdjacentHTML("beforeend", city);
    listCities.style.display = "inline-block";
}

// Count total population of citites
function countTotalPopulation(population){
    totalPopulation = totalPopulation + population;
    console.log("Total population:", totalPopulation);
}


// Print total population of citites
function printTotalPopulation(){
    let printTotalPopulation = document.createElement("p");
    container.appendChild(printTotalPopulation);

    printTotalPopulation.insertAdjacentHTML("beforeend", "Totalt antal invånare: " + totalPopulation);
}


// Clearing local storage 
document.getElementById("deleteVisitedCity").addEventListener("click", function deleteLocalStorage(){
    localStorage.clear();

    
});
