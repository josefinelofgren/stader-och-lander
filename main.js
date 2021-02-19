import {viewVisitedCities} from './modules/JosefinAndSara.mjs'
import {fetchData, printCountries, printCityInformation, saveLocalStorage} from './modules/huvudmeny.mjs';

// View vistied cities onclick 
document.getElementById("viewVisitedCities").addEventListener('click', function(){
    viewVisitedCities();
})


