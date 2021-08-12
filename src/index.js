import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import cardCountriesOne from './templates/countries-card-one.hbs';
import cardCountriesMoreOne from './templates/countries-card-moreOne.hbs';

var debounce = require('lodash.debounce');
import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice, info, success, error } from '@pnotify/core';

const refs = {
  searchForm: document.querySelector('#search'),
  cardContainer: document.querySelector('.card-container'),
};
// console.log(refs);
const searchForm_DELAY = 500;

refs.searchForm.addEventListener('input', debounce(onSearch, searchForm_DELAY));

function onSearch(event) {
  event.preventDefault();

  const searchQuery = event.target.value;
  console.log(searchQuery);

  const countriesHtml = fetchCountries(searchQuery);
  console.log(countriesHtml);

  countriesHtml.then(data => renderCard(data)).catch(error => console.log(error));
}

function renderCard(data) {
  console.log(data);
  console.log(data.length);

  if (data.length > 10) {
    const myNotice = error({
      type: 'notice',
      delay: 8000,
      text: 'Too many matches found. Please enter a more specific query!',
    });
    return myNotice;
  } else if (data.length > 1) {
    return createMarcup(data, cardCountriesMoreOne);
  } else if (data.length === 1) {
    return createMarcup(data, cardCountriesOne);
  }
}

function createMarcup(data, template) {
  refs.cardContainer.innerHTML = template(data);
}
