// Display weahter, img and info for specifik city
export function displayCityInfo(id) {
  document.getElementById("cityInfo").innerHTML = "";
  fetch("json/stad.json")
    .then((response) => response.json())
    .then((data) => {
      const selectedCity = data.find((city) => city.id === +id);
      // Get weather from api
      return fetch(
        `https://api.weatherbit.io/v2.0/current?&lang=sv&city=${selectedCity.stadname}&key=77183e339754431b9494ef1d8558588f`
      )
        .then((response) => response.json())
        .then((data) => {
          document.getElementById(
            "cityInfo"
          ).innerHTML += `<h4>Väder:</h4> ${data.data[0].app_temp} C, ${data.data[0].weather.description}`;
          // Get img and info from api
          return fetch(
            `https://sv.wikipedia.org/api/rest_v1/page/summary/${selectedCity.stadname} `
          )
            .then((response) => response.json())
            .then((data) => {
              document.getElementById(
                "cityInfo"
              ).innerHTML += `<h4>Info:</h4>  <img src="${data.thumbnail.source}"></img> <p> ${data.extract} </p>`;
            });
        });
    });
}