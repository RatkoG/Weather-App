console.log('Working...');
// const api = process.env.API_KEY;
const api = `6d3b43aab36f5d57f9d8671c01cef53c`;
// const proxy = `https://cors-anywhere.herokuapp.com/`;
// const endpoint = `api.openweathermap.org/data/2.5/weather`;

async function fetchWeather(query) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api}`
  );
  const data = await response.json();
  console.log(data);
  console.log(
    `Your location is ${data.name} and the weather is ${data.main.temp}`
  );
}
fetchWeather('Prilep');
