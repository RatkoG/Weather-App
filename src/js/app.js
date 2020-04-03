// MODELS
import Current from './Models/Current';
import Search from './Models/Search';

// VIEWS
import * as loader from './Views/loaderView';
import * as currentView from './Views/currentView';

const state = {};
// console.log(state);

const search = new Search('Ajax');
search.getWeather();

// ---CURRENT LOCATION CONTROLLER---
const currentController = async () => {
  const parent = document.querySelector('.main');
  loader.renderLoader(parent);
  if (!state.current) state.current = new Current();
  if (state.current.availableCoords() < 2) {
    await state.current.getCoords();
  }

  // Get weather for current location
  if (state.current.availableCoords() === 2) {
    await state.current.getWeather();
    loader.clearLoader(parent);
    currentView.renderCurrent(state.current, parent);
  }
};

currentController();

// ---SEARCH CONTROLLER---
const controlSearch = async (e) => {
  e.preventDefault();
  const query = 'Saskatoon';
  if (query) {
    state.search = new Search(query);
    await state.search.getWeather();
    // console.log(state.search.results);
  }
};

// Add Event Listeners
const form = document.querySelector('.search--form');
form.addEventListener('submit', controlSearch);

// This one is here to make sure to see it when everything is loaded, development purpose
// console.log(state.current);
