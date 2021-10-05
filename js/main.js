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

  const getCurrentSetting = (passedSetting) => {
    // let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

    // TODO: Add option to grab default user setting (passed Setting and local storage setting to overide)

    let currentSetting = 'light'; //default

    if (passedSetting) {
      currentSetting = passedSetting;
      console.log('passed: ' + currentSetting);
      //   return currentSetting;
    } else if (localStorage.getItem(STORAGE_KEY)) {
      currentSetting = localStorage.getItem(STORAGE_KEY);
      console.log('local storage: ' + currentSetting);
      //   return currentSetting;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      currentSetting = 'dark';
      console.log('matchMedia: ' + currentSetting);
      //
    } else {
      currentSetting = 'light'; //default
    }

    console.log('currentSetting: ' + currentSetting);
    // if there is a passedSetting, set curentSetting to that
    // else if there is a setting in local, set current to that
    // else use matchMedia setting
    // else default to 'light'

    // return currentSetting;
    applySetting();
  };

  const applySetting = (currentSetting) => {
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

  const toggleSetting = (currentSetting) => {
    // let currentSetting = localStorage.getItem(STORAGE_KEY);

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

    return passedSetting;
  };

  colorModeToggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    getCurrentSetting(toggleSetting()); // update color mode after user clicks
  });

  const changeMode = (e) => {
    console.log('mode changed');

    if (e.matches) {
      console.log('dark mode is enabled');
    } else {
      console.log('dark mode is disabled');
    }
  };

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
      console.log('dark mode is enabled');
      //   getCurrentSetting('dark');
      currentSetting = 'dark';
    } else {
      console.log('dark mode is disabled');
      currentSetting = 'light';
    }

    getCurrentSetting();
  });

  getCurrentSetting(); // run on page load to show user selected mode
}; // end onload fn
