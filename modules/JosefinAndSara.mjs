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
    let  ArrayCity =JSON.parse(localStorage.getItem("savedID"));
    let totalPopulation=0;
    console.log(ArrayCity);  
         for (let i in  ArrayCity ){
            console.log("VisitedCityId",parseInt(ArrayCity[i]) );
           // console.log("citiesArray",parsInt(citiesArray[i]));
            for(let c in city ){       
                if(ArrayCity[i]==city[c].id){
                   
                    console.log("Id", city[c].id);
                    console.log("Population",city[c].population);
                    console.log("City", city[c].stadname);
                    totalPopulation =totalPopulation+ city[c].population;
                    console.log(totalPopulation);
    //countTotalPopulation(city[c].population);
    printCities(city[c].stadname);

            }   
        }
    }
    totalPop.innerHTML = "Totalt antal invånare: " + totalPopulation;

    if(localStorage.getItem("savedID") == null){
        listCities.innerHTML = "Listan över besökta städer är tom."
        totalPop.innerHTML = "";
    }
  
}) 
}


// Print stored citites 
function printCities(city){
    let li = document.createElement('li');
    li.innerHTML = city; 
    
    listCities.appendChild(li);
}
    

export function clearLS(){
    localStorage.clear();

    if(localStorage.getItem("savedID") == null){
        listCities.innerHTML = "Listan över besökta städer är tom."
        totalPop.innerHTML = "";
    }
}
