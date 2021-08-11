import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import cardCountriesOne from './templates/countries-card-one.hbs';
import cardCountriesMoreOne from './templates/countries-card-moreOne.hbs';
import '@pnotify/core/dist/BrightTheme.css';

var debounce = require('lodash.debounce');
import { alert, notice, info, success, error } from '@pnotify/core';
// const { alert, notice, info, success, error } = require('@pnotify/core');

// ========= refs
const refs = {
  searchForm: document.querySelector('#search'),
  cardContainer: document.querySelector('.card-container'),
};
console.log(refs);
const searchForm_DELAY = 500;

// ========= listener
refs.searchForm.addEventListener('input', debounce(onSearch, searchForm_DELAY));

// ========== search
function onSearch(event) {
  event.preventDefault();

  const searchQuery = event.target.value;
  console.log(searchQuery);

  // fetchCountries(searchQuery);

  const countriesHtml = fetchCountries(searchQuery);
  console.log(countriesHtml);

  countriesHtml.then(data => renderCard(data)).catch(error => console.log(error));
}

// ========== render marckup
function renderCard(data) {
  console.log(data);
  console.log(data.length);
  refs.cardContainer.innerHTML = '';
  return createMarcup(data, cardCountriesOne);
}

// ========== marckup
function createMarcup(data, template) {
  refs.cardContainer.innerHtml = template(data);
}
