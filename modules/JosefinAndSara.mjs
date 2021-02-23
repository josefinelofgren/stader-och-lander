let savedCities = document.getElementById('savedCities');
let totalPopulation = 0;
let savedId = localStorage.getItem("savedID");

export let listCities = document.createElement("ul");
savedCities.appendChild(listCities);

export let totalPop = document.createElement("p");
totalPop.id = "totalPopulation";
savedCities.appendChild(totalPop);

// Visited cities view 
export function viewVisitedCities(){
    console.log(localStorage);
    visitedCities();

    document.getElementById("cityName").innerHTML = "Besökta städer";
    document.getElementById("cityInfo").innerHTML = "";
    savedCities.style.display = "block";
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
    let savedCities = document.createElement('li');
    savedCities.setAttribute('class', 'saved-cities')
    savedCities.innerHTML = city; 
    
    listCities.appendChild(savedCities);
}
    

export function clearLS(){
    localStorage.clear();

    if(localStorage.getItem("savedID") == null){
        listCities.innerHTML = "Listan över besökta städer är tom."
        totalPop.innerHTML = "";
    }
}
