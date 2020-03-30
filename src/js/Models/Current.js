function getCurrentLocation(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      ({ code, message }) =>
        reject(
          Object.assign(new Error(message), { name: 'PositionError', code })
        ),
      options
    );
  });
}

export default class Current {
  constructor() {
    this.coords = [];
  }

  // TODO: IF this is called from the controller handle the error over there
  async getCoords() {
    const data = await getCurrentLocation({
      enableHighAccuracy: true,
      maximumAge: 0,
    });
    this.coords = [data.coords.latitude, data.coords.longitude];
  }
  availableCoords() {
    return this.coords.length;
  }

  async getWeather() {
    const api = process.env.API_KEY;
    const endpoint = 'http://api.openweathermap.org/data/2.5/weather';
    // TODO: Move .catch if you want to catch the error on so other place.  Ex When the function is called
    // TODO: Remove Units= Metric if you decide to do calculation for C and F
    const response = await fetch(
      `${endpoint}?lat=${this.coords[0]}&lon=${this.coords[1]}&units=metric&appid=${api}`
    ).catch(handleError);
    this.results = await response.json();
    this.name = this.results.name;
    this.weather = {
      temp: this.results.main.temp,
      temp_max: this.results.main.temp_max,
      temp_min: this.results.main.temp_min,
      description: this.results.weather[0].main,
      icon: this.results.weather[0].icon,
    };
  }
}

function handleError(err) {
  console.log('Ups... Something went wrong 💩');
  console.log(err);
}
