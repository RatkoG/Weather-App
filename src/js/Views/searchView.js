import { elements } from './base';

export const getInput = () => {
  return elements.searchInput.value;
};

export const clearInput = () => {
  elements.searchInput.value = '';
};

// const renderCity = (city) => {
//   const html = `

// 	<div class="list">
// 		<div class="city">${city.name}</div>
// 		<div class="main--temperature">-40º</div>
// 	</div>
// 	`;
//   elements.searchCityList.insertAdjacentHTML('beforeend', html);
// };

// export const renderResult = (city) => {
//   console.log(`The CITY IS...`, city.name);
//   // const html = `
//   // <div class="list">
//   // 	<div class="city">${city.name}</div>
//   // 	<div class="main--temperature">-40º</div>
//   // </div>
//   // `;
//   // elements.searchCityList.insertAdjacentHTML('beforeend', html);
// };

export const renderResult = (city) => {
  console.log(`The CITY IS...`, city.name);
  const html = `
	<div class="list">
		<div class="city">${city.name}</div>
		<div class="main--temperature">${Math.round(city.main.temp)}</div>
  </div>

	`;
  elements.searchCityList.insertAdjacentHTML('beforeend', html);
};

// export const renderResult = (city) => {
//   console.log(`The CITY IS...`, city.name);
//   if (city.name === undefined) {
//     alert('Please enter valid city');
//   } else {
//     const html = `
// 	<div class="list">
// 		<div class="city">${city.name}</div>
// 		<div class="main--temperature">${Math.round(city.main.temp)}</div>
//   </div>

// 	`;
//     elements.searchCityList.insertAdjacentHTML('beforeend', html);
//   }
// };

// import { elements } from './base';

// // Render the Initial View
// export const renderSearch = () => {
//   const markup = `
//     <div class="add-city open">
//         <button class="close-popup animated fadeIn delay-1s">
//           <svg class="close-popup--icon">
//             <use xlink:href="./img/symbol-defs.svg#icon-plus"></use>
//           </svg>
//         </button>
//         <div class="title animated fadeIn">
//           <svg class="title__icon">
//             <use xlink:href="./img/symbol-defs.svg#icon-map"></use>
//           </svg>
//           <h1 class="title__text">
//             Add new location
//           </h1>
//         </div>
//         <div class="title__text--subtitle animated fadeIn">
//           Find a city and tap on it to add
//         </div>
//         <div class="search animated fadeIn">
//           <form action="#" class="search__form">
//             <input
//               type="text"
//               name="search"
//               class="search__form__input"
//               placeholder="Start typing here"
//             />
//           </form>
//           <div class="search__results">
//             <!-- RESULTS HERE -->
//           </div>
//         </div>
//       </div>
//   `;
//   elements.container.innerHTML = markup;
// };

// // Render the results
// // Gets result and if result is already in saved oibject
// export const renderResults = (res, isSaved) => {
//   const resultsContainer = document.querySelector('.search__results');
//   const markup = `
//   <div class="search__results__single ${
//     isSaved ? 'saved' : ''
//   } animated fadeIn" data-id="${res.id}">
//     <div class="search__results__single--country animated fadeIn">${
//       res.country
//     }</div>
//     <div class="search__results__single--city animated fadeIn">${res.name}</div>
//   </div>
//   `;
//   resultsContainer.insertAdjacentHTML('beforeend', markup);
// };

// // Remove previous search
// export const clearSearch = () => {
//   const resultsContainer = document.querySelector('.search__results');
//   resultsContainer.innerHTML = '';
// };

// // !Ova ne mi treba segaFunction to remove the saved class when location gets removed from saved
// // export const removeSaved = id => {
// //   if (id) {
// //     const item = document.querySelector(
// //       `.search__results__single[data-id='${id}']`
// //     );
// //     item.classList.remove('saved');
// //   }
// // };
