export function visitedCity(){
    let totalPopulation=0;
    console.log("hello");
fetch("json/stad.json")
.then(response=>response.json())
.then(stad=>{
    console.log(stad);
    let idNumber=[];
    for(let i in stad ){
        console.log(stad[i].id);
       idNumber.push(stad[i].id) ;
    console.log( idNumber);
    }
    localStorage.setItem("VisitedId",JSON.stringify(idNumber));
    console.log("localstorage:",localStorage);
    let VisitedCityId=JSON.parse(localStorage.getItem('VisitedId'));
    console.log("new Array:",VisitedCityId);
    console.log("length:",VisitedCityId.length);
// check Id of local storage with cities Id 
     for (let i in VisitedCityId ){
        console.log("VisitedCityId",VisitedCityId[i]);
        for(let s in stad ){       
        if(VisitedCityId[i]==stad[s].id){
            console.log("stad",stad[s].id);
            console.log("population",stad[s].population);
            //console.log("vi added");
// Add population of cities 
           totalPopulation=totalPopulation+stad[s].population;
  
        }   
    }
}
console.log("total population:",totalPopulation);
}) 
}
// clearing local storage 
document.getElementById("deleteVisitedCity").addEventListener("click", function deleteLocalStorage(){
    console.log("hej från deletlocalstorage");
    localStorage.clear();
});
