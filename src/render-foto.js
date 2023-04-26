import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import createScroll from './scroll';
const lightbox = new SimpleLightbox('.gallery a');
export default function renderMurcup(hits) {
  hits.map(
    ({ comments, downloads, largeImageURL, likes, views, webformatURL }) => {
      const murcup = `<div class="photo-card"><a href="${largeImageURL}"><img class="photo-img" src="${webformatURL}" alt="" loading="lazy" width="320" height="220" /></a><div class="info"><div class="info-box-one"><p class="info-item"><b>Likes: ${likes}</b></p><p class="info-item"><b>Views: ${views}</b></p></div><div class="info-box-two"><p class="info-item"><b>Comments: ${comments}</b></p><p class="info-item"><b>Downloads: ${downloads}</b></p></div></div></div>`;

      document
        .querySelector('.gallery')
        .insertAdjacentHTML('beforeend', murcup);
      lightbox.refresh();
    }
  );

  createScroll();
}
