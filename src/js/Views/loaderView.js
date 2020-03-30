export const renderLoader = parent => {
  const html = `
	<div class="loader">
        <div class="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
	`;
  parent.insertAdjacentHTML('afterbegin', html);
};

export const clearLoader = parent => {
  const loader = parent.querySelector('.loader');
  parent.removeChild(loader);
};
