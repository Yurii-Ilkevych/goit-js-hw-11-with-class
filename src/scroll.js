import { notification } from './api-system-class';
import { anserSearch } from './index';
const options = {
  rootMargin: '1000px',
};
let observer = null;
export default function createScroll() {
  if (observer !== null) {
    observer.unobserve(document.querySelector('.load-more'));
  }
  observer = new IntersectionObserver(obs, options);
  observer.observe(document.querySelector('.load-more'));
  function obs(entries) {
    entries.forEach(entry => {
      if (
        entry.isIntersecting &&
        anserSearch.photoBeenDownload < anserSearch.totalHitsPhoto
      ) {
        anserSearch.doStuff();
      } else if (anserSearch.photoBeenDownload > anserSearch.totalHitsPhoto) {
        notification.anserTheEndOfSearch();
        observer.unobserve(document.querySelector('.load-more'));
      } else if (anserSearch.photoBeenDownload === anserSearch.totalHitsPhoto) {
        notification.anserRemainder(anserSearch.totalHitsPhoto);
        observer.unobserve(document.querySelector('.load-more'));
      }
    });
  }
}
