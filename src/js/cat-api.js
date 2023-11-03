import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_URYiUDVMJKnsTYSLnYWeR31PUeH8c5Yz2b0ev0a1MU6oS9U6mrAOkeE6lCc4s4wU';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorInfo = document.querySelector('.error');

errorInfo.style.display = 'none';

function hideElement(element) {
  element.style.display = 'none';
}

function showElement(element) {
  element.style.display = 'block';
}

async function fetchBreeds() {
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

async function fetchCatByBreed(breedId) {
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

function displayCatInfo(catData) {
  catInfo.innerHTML = `
    <div class="wrapper">
    <img class="cat-img" src="${catData[0].url}" alt="Cat Image"/>
    <div>
    <h2>${catData[0].breeds[0].name}</h2>
    <p><b>Description:</b> ${catData[0].breeds[0].description}</p>
    <p><b>Temperament:</b> ${catData[0].breeds[0].temperament}</p>
    </div>
    </div>
  `;
  showElement(catInfo);
}

async function handleBreedSelection() {
  const selectedBreedId = breedSelect.value;
  const catData = await fetchCatByBreed(selectedBreedId);

  if (!catData) {
    return;
  } else if (catData.length === 0) {
    iziToast.show({
      title: 'Error',
      message: '❌ Oops! Something went wrong! Try reloading the page!',
      position: 'topCenter',
      color: 'red',
    });
    return;
  }

  displayCatInfo(catData);
}

export async function initializeApp() {
  const breeds = await fetchBreeds();

  if (!breeds) return;

  const breedOptions = breeds.map(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    return option;
  });

  breedSelect.append(...breedOptions);

  breedSelect.addEventListener('change', handleBreedSelection);
}

initializeApp();
