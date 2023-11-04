import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const spinner = document.querySelector('.spinner');

const errorMessage = {
  title: 'Error',
  message: '❌ Oops! Something went wrong! Try reloading the page!',
  position: 'topCenter',
  color: 'red',
};

function showElement(element) {
  element.style.display = 'block';
}

function hideElement(element) {
  element.style.display = 'none';
}

async function handleBreedSelection() {
  try {
    const selectedBreedId = breedSelect.value;
    hideElement(catInfo);
    showElement(spinner);

    const catData = await fetchCatByBreed(selectedBreedId);

    displayCatInfo(catData);
  } catch (error) {
    iziToast.show(errorMessage);
  }

  hideElement(spinner);
}

function displayCatInfo(catData) {
  const cat = catData[0].breeds[0];
  catInfo.innerHTML = `
    <div class="wrapper">
      <img class="cat-img" src="${catData[0].url}" alt="Cat Image"/>
      <div>
        <h2>${cat.name}</h2>
        <p><b>Description:</b> ${cat.description}</p>
        <p><b>Temperament:</b> ${cat.temperament}</p>
      </div>
    </div>
  `;
  showElement(catInfo);
}

async function initializeApp() {
  try {
    const breeds = await fetchBreeds();

    const breedOptions = breeds.map(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      return option;
    });

    breedSelect.append(...breedOptions);
    showElement(breedSelect);

    breedSelect.addEventListener('change', handleBreedSelection);
  } catch (error) {
    iziToast.show(errorMessage);
  }

  hideElement(spinner);
}

initializeApp();
