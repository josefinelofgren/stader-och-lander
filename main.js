import {viewVisitedCities, listCities, totalPop, clearLS} from './modules/JosefinAndSara.mjs'
import {fetchData, printCountries, printCityInformation, saveLocalStorage} from './modules/huvudmeny.mjs';


if(localStorage.getItem("savedID") == null){
    listCities.innerHTML = "Listan över besökta städer är tom."
}

function startPage(){
    document.getElementById("cityName").innerHTML = "Ingen stad vald";
    document.getElementById("cityInfo").innerHTML = "Välj en stad i menyn för att se information.";

    document.getElementById("visitedCity").style.display = "none";
}

startPage();


document.getElementById("deleteVisitedCity").addEventListener("click", function deleteLocalStorage(){
   clearLS();
}) 

// View vistied cities onclick 
document.getElementById("viewVisitedCities").addEventListener('click', function(){
    viewVisitedCities();
})

