import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_URYiUDVMJKnsTYSLnYWeR31PUeH8c5Yz2b0ev0a1MU6oS9U6mrAOkeE6lCc4s4wU';

const loader = document.querySelector('.loader');
const breedSelect = document.querySelector('.breed-select');

function hideElement(element) {
  element.style.display = 'none';
}

function showElement(element) {
  element.style.display = 'block';
}

export async function fetchBreeds() {
  showElement(loader);
  hideElement(breedSelect);

  return await axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      showElement(breedSelect);
      return response.data;
    })
    .catch(() => {
      iziToast.show({
        title: 'Error',
        message: '❌ Oops! Something went wrong! Try reloading the page!',
        position: 'topCenter',
        color: 'red',
      });
    })
    .finally(() => hideElement(loader));
}

export async function fetchCatByBreed(breedId) {
  showElement(loader);

  return await axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(() => {
      iziToast.show({
        title: 'Error',
        message: '❌ Oops! Something went wrong! Try reloading the page!',
        position: 'topCenter',
        color: 'red',
      });
    })
    .finally(() => hideElement(loader));
}
