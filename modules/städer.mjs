export function displayCityInfo(id) {
  console.log(id);
  fetch("json/stad.json")
    .then((response) => response.json())
    .then((data) => {
      const selectedCity = data.find((city) => city.id === +id);
      
      let country;
      if (selectedCity.countryid === 1) {
        country = "Sweden";
      } else if (selectedCity.countryid === 2) {
        country = "Finland";
      } else if (selectedCity.countryid === 3) {
        country = "Norway";
      }

      return fetch(
        `https://api.weatherbit.io/v2.0/current?&lang=sv&city=${selectedCity.stadname}&country=${country}&key=77183e339754431b9494ef1d8558588f`
      )
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("cities").innerHTML += `<p> <h4>Väder:</h4> ${data.data[0].app_temp} C, ${data.data[0].weather.description} </p>`;

          return fetch(
            `https://sv.wikipedia.org/api/rest_v1/page/summary/${selectedCity.stadname} `
          )
            .then((response) => response.json())
            .then((data) => {
              console.log("wiki", data);
              document.getElementById("cities").innerHTML="";
              document.getElementById("cities").innerHTML += `<h4>Info:</h4>  <img src="${data.thumbnail.source}"></img> <p> ${data.extract} </p>`;
            });
        });
    });
}
