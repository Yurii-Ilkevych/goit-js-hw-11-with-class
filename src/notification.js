import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';
const optionMessage = {
  position: 'right-top',
  timeout: 2250,
  fontSize: '20px',
  borderRadius: '15px',
};

export default class Notification {
  anserWarning() {
    Notify.info('Please enter a value to search for', optionMessage);
  }

  anserError() {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
      optionMessage
    );
  }

  anserFound(totalHitsPhoto, hitsPhoto, photoBeenDownload) {
    if (totalHitsPhoto === photoBeenDownload) {
      return;
    }
    Notify.success(
      `Hooray! We found ${
        totalHitsPhoto - photoBeenDownload + hitsPhoto
      } images.`,
      optionMessage
    );
  }
  anserRemainder(totalHitsPhoto) {
    Notify.success(`Hooray! We found ${totalHitsPhoto} images.`, optionMessage);
  }
  anserTheEndOfSearch() {
    Notify.info(
      "We're sorry, but you've reached the end of search results.",
      optionMessage
    );
  }
}
