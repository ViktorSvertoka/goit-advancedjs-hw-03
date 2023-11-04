import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const errorInfo = document.querySelector('.error');
const loader = document.querySelector('.loader');

errorInfo.style.display = 'none';

function showElement(element) {
  element.style.display = 'block';
}

function hideElement(element) {
  element.style.display = 'none';
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
  showElement(loader);

  try {
    const catData = await fetchCatByBreed(selectedBreedId);

    if (catData.length === 0) {
      iziToast.show({
        title: 'Error',
        message: '❌ Oops! Something went wrong! Try reloading the page!',
        position: 'topCenter',
        color: 'red',
      });
    } else {
      displayCatInfo(catData);
    }
  } catch (error) {
    iziToast.show({
      title: 'Error',
      message: '❌ Oops! Something went wrong! Try reloading the page!',
      position: 'topCenter',
      color: 'red',
    });
  } finally {
    hideElement(loader);
  }
}

export async function initializeApp() {
  try {
    showElement(loader);
    const breeds = await fetchBreeds();

    if (breeds) {
      const breedOptions = breeds.map(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        return option;
      });

      breedSelect.append(...breedOptions);
      breedSelect.addEventListener('change', handleBreedSelection);
    } else {
      iziToast.show({
        title: 'Error',
        message: '❌ Oops! Something went wrong! Try reloading the page!',
        position: 'topCenter',
        color: 'red',
      });
    }
  } catch (error) {
    iziToast.show({
      title: 'Error',
      message: '❌ Oops! Something went wrong! Try reloading the page!',
      position: 'topCenter',
      color: 'red',
    });
  } finally {
    hideElement(loader);
  }
}

initializeApp();
