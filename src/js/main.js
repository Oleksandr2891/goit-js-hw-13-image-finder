import menuCards from '../menu-cards.hbs';
import getMenu from '../menu.json';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const rootCards = document.querySelector('.js-menu');
const markup = menuCards(getMenu);
const themeSkine = document.querySelector('body');
const switchOfTheme = document.querySelector('#theme-switch-toggle');
rootCards.insertAdjacentHTML('beforeend', markup);

const isDarkTheme = (saveTheme) => {

    if (!!localStorage.getItem('theme')) {
        switchOfTheme.checked = true;
        saveTheme = localStorage.getItem('theme');
        themeSkine.classList.remove('light-theme');
    } else {
        saveTheme = Theme.LIGHT
    };
    return saveTheme;
 };

themeSkine.classList.add(isDarkTheme());

switchOfTheme.addEventListener('change', (e) => {
    
    if (!e.target.checked && themeSkine.classList.contains(Theme.DARK)) {
        localStorage.removeItem('theme');
        themeSkine.classList.replace(Theme.DARK, Theme.LIGHT);
    } else {
        localStorage.setItem('theme', 'dark-theme');
        themeSkine.classList.replace(Theme.LIGHT, Theme.DARK);
        isDarkTheme();
    };
});


