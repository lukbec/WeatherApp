window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationCity = document.querySelector(".location-city");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const apiKey = "5ff970d66d644a40a9e32bafa18de651";
      const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${apiKey}&include=minutely`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp, timezone, city_name } = data.data[0];
          const { description } = data.data[0].weather;

          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationCity.textContent = city_name;
          setIcon(document.querySelector(".icon"));
        });
    });
  }

  function setIcon(iconId) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = "CLEAR_DAY";
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});
