let container = document.getElementById('container');
let totalPopulation = 0;

// Visited cities view 
export function viewVisitedCities(){
    visitedCities();

    document.getElementById('city-name').innerHTML = "Besökta städer";
    document.getElementById('city-info').innerHTML = "";

    document.getElementById('visitedCity').style.display = "none";
}


// Fetch cities 
function visitedCities(){
fetch("json/stad.json")
.then(response=>response.json())
.then(city => {
    console.log(city);
    let idNumber = [];
    
    for(let i in city ){
        console.log(city[i].id);
        idNumber.push(city[i].id) ;
        console.log( idNumber);
    }
    
    localStorage.setItem("VisitedId",JSON.stringify(idNumber));
    console.log("localstorage:",localStorage);
    
    let visitedCityId = JSON.parse(localStorage.getItem('VisitedId'));
    console.log("new Array:",visitedCityId);
    console.log("length:",visitedCityId.length);
    
    checkId(visitedCityId, city);
}) 
}


// Check Id of local storage with cities Id 
function checkId(visitedCityId, city){
         for (let i in visitedCityId ){
            console.log("VisitedCityId",visitedCityId[i]);
            
            for(let c in city ){       
                if(visitedCityId[i]==city[c].id){
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




// Clearing local storage 
document.getElementById("deleteVisitedCity").addEventListener("click", function deleteLocalStorage(){
    localStorage.clear();
});
