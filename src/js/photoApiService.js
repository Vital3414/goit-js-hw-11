const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35747658-5cf63d9708f6fa65556d558ab';

import axios from 'axios';
import Notiflix from 'notiflix';

export default class PixabayApiService {
  constructor(searchParams) {
    this.config = { params: { key: API_KEY, q: '', ...searchParams, page: 1 } };
  }

  async getPhotos() {
    try {
      const response = await axios.get(BASE_URL, this.config);

      if (response.status === 200) {
        if (!response.data.hits.length) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        if (this.config.params.page === 1) {
          Notiflix.Notify.info(
            `Hooray! We found ${response.data.totalHits} images.`
          );
        }
        this.incrementPage();
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  set searchQuery(query) {
    this.config.params.q = query;
  }

  get searchQuery() {
    return this.config.params.q;
  }

  incrementPage() {
    this.config.params.page += 1;
  }

  resetPage() {
    this.config.params.page = 1;
  }
}
