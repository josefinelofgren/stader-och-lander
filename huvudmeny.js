
Promise.all([
    fetch("json/land.json").then(response => response.json()),
    fetch("json/stad.json").then(response => response.json())
])
    .then(data => {
        console.log("Länder", data[0]);
        console.log("Städer", data[1]);

        printCountries(data);
    })

    // Funktion för att skriva ut länder i huvudmenyn

    function printCountries(list) {

        let countries = list[0];
        
        for (let country in countries) {
            if (countries.hasOwnProperty(country)) {
                console.log(countries[country].countryname);

                document.getElementById("list-countries").insertAdjacentHTML("beforeend", "<li>" + countries[country].countryname + "</li>");
            }
        }
    }

    

       

    


