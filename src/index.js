import SlimSelect from 'slim-select';

import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const select = document.getElementById('breed-select');
const catInfo = document.querySelector('.cat-info');
const spinner = document.querySelector('.spinner');

const slimSelect = new SlimSelect({
  select: select,
  settings: {
    placeholderText: 'Search breeds',
  },
});

const errorMessage = {
  title: 'Error',
  message: '❌ Oops! Something went wrong! Try reloading the page!',
  position: 'topCenter',
  color: 'red',
};

function showElement(element, hidden) {
  element.classList.toggle('ss-hide', !hidden);
}

async function handleBreedSelection() {
  try {
    const selectedBreedId = select.value;
    showElement(catInfo, false);
    showElement(spinner, true);

    const catData = await fetchCatByBreed(selectedBreedId);

    displayCatInfo(catData);
  } catch (error) {
    iziToast.show(errorMessage);
  }

  showElement(spinner, false);
}

function displayCatInfo(catData) {
  const cat = catData[0].breeds[0];
  catInfo.innerHTML = `
    <div class="wrapper">
      <img class="cat-img" src="${catData[0].url}" alt="Cat Image"/>
      <div class="wrap">
        <h2 class="text">${cat.name}</h2>
        <p><b class="primary">Description:</b> ${cat.description}</p>
        <p><b class="primary">Temperament:</b> ${cat.temperament}</p>
        <p><b class="primary">Country:</b> ${cat.origin}</p>
      </div>
    </div>
  `;

  showElement(catInfo, true);
}

async function initializeApp() {
  try {
    await fetchBreeds().then(breeds => {
      const data = breeds.map(({ id, name }) => ({ text: name, value: id }));
      slimSelect.setData([{ placeholder: true, text: '' }, ...data]);
    });

    showElement(select, true);
    select.addEventListener('change', handleBreedSelection);
  } catch (error) {
    iziToast.show(errorMessage);
    showElement(select, false);
  }

  showElement(spinner, false);
}

initializeApp();
