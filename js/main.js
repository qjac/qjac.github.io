window.onload = function () {
  //   remove the 'no-js' class and id if this loads
  let el = document.getElementById('no-js');
  el.classList.remove('no-js');
  el.id = '';

  // light/dark mode toggle
  // following this tutorial: https://piccalil.li/tutorial/create-a-user-controlled-dark-or-light-mode/
  const STORAGE_KEY = 'user-color-scheme';
  const COLOR_MODE_KEY = '--color-mode';

  const colorModeToggleButton = document.querySelector('.js-mode-toggle');
  const colorModeToggleText = document.querySelector('.js-mode-toggle-text');
  const modeStatusElement = document.querySelector('.js-mode-status');

  getCssCustomProp = (propKey) => {
    let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

    if (response.length) {
      response = response.replace(/\"/g, '').trim();
    }

    return response;
  };

  const applySetting = (passedSetting) => {
    let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

    if (currentSetting) {
      document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
      setButtonLabelAndStatus(currentSetting);
    } else {
      setButtonLabelAndStatus(getCssCustomProp(COLOR_MODE_KEY));
    }
  };

  const setButtonLabelAndStatus = (currentSetting) => {
    colorModeToggleText.innerText = `Enable ${currentSetting === 'dark' ? 'light' : 'dark'}`;

    modeStatusElement.innerText = `Color mode is now "${currentSetting}"`;
  };

  const toggleSetting = () => {
    let currentSetting = localStorage.getItem(STORAGE_KEY);

    switch (currentSetting) {
      case null:
        currentSetting = getCssCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
        break;

      case 'light':
        currentSetting = 'dark';
        break;

      case 'dark':
        currentSetting = 'light';
        break;
    }

    localStorage.setItem(STORAGE_KEY, currentSetting);
    console.log(currentSetting);

    return currentSetting;
  };
  colorModeToggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    applySetting(toggleSetting()); // update color mode after user clicks
  });
  applySetting(); // run on page load to show user selected mode
}; // end onload fn
