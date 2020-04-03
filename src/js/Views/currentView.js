export const renderCurrent = (result, parent) => {
  const test = `
	<div class="current-location">
	<?xml version="1.0" encoding="UTF-8"?>
	<svg width="64px" height="90px" viewBox="0 0 64 90" version="1.1" xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink">
		<path
			d="M31.99994,0 C23.67139,0 15.6839543,3.30849594 9.7947801,9.1976701 C3.90560594,15.0868443 0.59711,23.07428 0.59711,31.40283 C0.59711,51.64417 24.49042,81.92902 30.59393,89.33502 C30.9394271,89.755965 31.4553541,89.999964 31.99993,89.999964 C32.5445059,89.999964 33.0604329,89.755965 33.40593,89.33502 C39.50945,81.92902 63.40276,51.64417 63.40276,31.40283 C63.40276,23.0742818 60.0942654,15.0868475 54.2050934,9.19767364 C48.3159214,3.30849976 40.3284882,0 31.99994,0 Z M31.99994,46.9762 C25.7010813,46.9762 20.0224404,43.1818861 17.6119631,37.362503 C15.2014858,31.5431198 16.5338755,24.8447139 20.9878397,20.3907468 C25.441804,15.9367797 32.140209,14.6043857 37.9595937,17.0148593 C43.7789784,19.4253328 47.5733,25.1039713 47.5733,31.40283 C47.5733,40.003754 40.600864,46.9762 31.99994,46.9762 L31.99994,46.9762 Z"
			id="Shape" fill="#FF6D6D" fill-rule="nonzero"></path>
	</svg>Current Location
</div>
<div class="condition">
	<img src="./img/weather/sunny.svg" alt="" class="weather--icon" />
</div>
<div class="location">${result.name}</div>
<div class="temperature">${result.weather.temp}<span>ºC</span></div>
<div class="condition_text">${result.weather.description}</div>
<div class="minmax">min ${result.weather.temp_min} ºC / max ${result.weather.temp_max} ºC</div>
<div class="next_days">Next 5 days</div>
</div>

	`;
  parent.insertAdjacentHTML('afterbegin', test);
};
