import { viewVisitedCities, listCities, clearLS } from './modules/visitedCities.mjs';
import { fetchData, printCountries, printCityInformation, saveLocalStorage } from './modules/huvudmeny.mjs';

// Print startpage 
function startPage() {
    document.getElementById("cityName").innerHTML = "Ingen stad vald";
    document.getElementById("cityInfo").innerHTML = "Välj en stad i menyn för att se information.";
    document.getElementById("visitedCity").style.display = "none";
}

startPage();

// Clear local storage while clicking "Töm besökta städer" 
document.getElementById("deleteVisitedCity").addEventListener("click", function deleteLocalStorage() {
    clearLS();
})

// View vistied cities while clicking "Visa besökta städer" 
document.getElementById("viewVisitedCities").addEventListener('click', function () {
    viewVisitedCities();
})