export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getWeather() {
    const api = process.env.API_KEY;
    const endpoint = 'http://api.openweathermap.org/data/2.5/weather';
    // TODO: Move .catch if you want to catch the error on so other place.  Ex When the function is called

    const response = await fetch(
      `${endpoint}?q=${this.query}&units=metric&appid=${api}`
    );
    this.results = await response.json();
  }
}
