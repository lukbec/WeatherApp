window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationCity = document.querySelector(".location-city");

  const weatherbitIcons = new Map([
    ["a01d", "FOG"],
    ["a01n", "FOG"],
    ["a02d", "FOG"],
    ["a02n", "FOG"],
    ["a03d", "FOG"],
    ["a03n", "FOG"],
    ["a04d", "FOG"],
    ["a05d", "FOG"],
    ["a05n", "FOG"],
    ["a06d", "FOG"],
    ["a06n", "FOG"],
    ["c01d", "CLEAR_DAY"],
    ["c01n", "CLEAR_NIGHT"],
    ["c02d", "PARTLY_CLOUDY_DAY"],
    ["c02n", "PARTLY_CLOUDY_NIGHT"],
    ["c03d", "CLOUDY"],
    ["c03n", "CLOUDY"],
    ["c04d", "CLOUDY"],
    ["c04n", "CLOUDY"],
    ["d01d", "RAIN"],
    ["d01n", "RAIN"],
    ["d02d", "RAIN"],
    ["d02n", "RAIN"],
    ["d03d", "RAIN"],
    ["d03n", "RAIN"],
    ["f01d", "RAIN"],
    ["f01n", "RAIN"],
    ["r01d", "RAIN"],
    ["r01n", "RAIN"],
    ["r02d", "RAIN"],
    ["r02n", "RAIN"],
    ["r03d", "RAIN"],
    ["r03n", "RAIN"],
    ["r04d", "RAIN"],
    ["r04n", "RAIN"],
    ["r05d", "RAIN"],
    ["r05n", "RAIN"],
    ["r06d", "RAIN"],
    ["r06n", "RAIN"],
    ["s01d", "SNOW"],
    ["s01n", "SNOW"],
    ["s02d", "SNOW"],
    ["s02n", "SNOW"],
    ["s03d", "SNOW"],
    ["s03n", "SNOW"],
    ["s04d", "SLEET"],
    ["s04n", "SLEET"],
    ["s05d", "SLEET"],
    ["s05n", "SLEET"],
    ["s06d", "SNOW"],
    ["s06n", "SNOW"],
    ["t01d", "RAIN"],
    ["t01n", "RAIN"],
    ["t02d", "RAIN"],
    ["t02n", "RAIN"],
    ["t03d", "RAIN"],
    ["t03n", "RAIN"],
    ["t04d", "RAIN"],
    ["t04n", "RAIN"],
    ["t05d", "RAIN"],
    ["t05n", "RAIN"],
    ["u00d", "SLEET"],
    ["u00n", "SLEET"],
  ]);

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
          const { temp, city_name } = data.data[0];
          const { description, icon } = data.data[0].weather;

          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationCity.textContent = city_name;
          setIcon(document.querySelector(".icon"), icon);
        });
    });
  }

  function setIcon(iconId, iconCode) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = weatherbitIcons.get(iconCode);
    console.log(currentIcon);
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});
