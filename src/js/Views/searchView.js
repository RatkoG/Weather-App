import { elements } from './base';

export const getInput = () => {
  return elements.searchInput.value;
};

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const renderResult = (city) => {
  const html = `
	<div class="list">
		<div class="city">${city.name}</div>
		<div class="main--temperature">${Math.round(city.main.temp)}</div>
  </div>

	`;
  elements.searchCityList.insertAdjacentHTML('beforeend', html);
};
