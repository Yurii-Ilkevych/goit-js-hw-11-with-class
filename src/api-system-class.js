import axios from 'axios';
import Notification from './notification';
import renderMurcup from './render-foto';
export const notification = new Notification();
const API_KEY = '35606750-af8374c970d110a408f6cc0ed';
const BASE_URL = 'https://pixabay.com/api/';
const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
}).toString();

const refs = {
  input: document.querySelector('[type="text"]'),
};
export default class AnserSearch {
  constructor() {
    this.search = '';
    this.page = 1;
    this.totalHitsPhoto = '';
    this.hitsPhoto = '';
    this.photoBeenDownload = 0;
  }

  async doStuff() {
    try {
      const photoData = await this.fetchPhotosData();
      if (photoData.data.totalHits === 0) {
        throw new Error();
      }
      renderMurcup(photoData.data.hits);
      this.incrementPage();
      this.counterPhoto(photoData.data);
    } catch (error) {
      console.log(error);
      notification.anserError();
    }
  }

  async fetchPhotosData() {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${this.search}&per_page=40&page=${this.page}&${searchParams}`
    );
    return response;
  }

  counterPhoto(data) {
    this.incrementTotalHits(data);
    this.incrementHits(data);
    this.counterPhotoBeenDownload();
  }
  incrementTotalHits(data) {
    this.totalHitsPhoto = data.totalHits;
  }
  incrementHits(data) {
    this.hitsPhoto = data.hits.length;
  }
  counterPhotoBeenDownload() {
    this.photoBeenDownload += this.hitsPhoto;

    notification.anserFound(
      this.totalHitsPhoto,
      this.hitsPhoto,
      this.photoBeenDownload
    );
  }

  get searchText() {
    return this.search;
  }

  set searchText(newSearch) {
    return (this.search = newSearch);
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  resetValueInputAndSearch() {
    refs.input.value = '';
  }
  resetDataConstructor() {
    this.search = '';
    this.page = 1;
    this.totalHitsPhoto = '';
    this.hitsPhoto = '';
    this.photoBeenDownload = 0;
  }
}
