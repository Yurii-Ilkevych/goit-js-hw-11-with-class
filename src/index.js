export { callInClassFetch, anserSearch };
import AnserSearch from './api-system-class';
import Notification from './notification';
import './scroll';
const refs = {
  formSearch: document.querySelector('#search-form'),
};
const anserSearch = new AnserSearch();
const notification = new Notification();
refs.formSearch.addEventListener('submit', startSearch);

function startSearch(evt) {
  evt.preventDefault();
  if (evt.currentTarget.elements[0].value === '') {
    notification.anserWarning();
    return;
  }
  anserSearch.resetDataConstructor();
  anserSearch.resetPage();
  anserSearch.searchText = evt.currentTarget.elements[0].value.trim();
  anserSearch.resetValueInputAndSearch();
  anserSearch.doStuff();
}
