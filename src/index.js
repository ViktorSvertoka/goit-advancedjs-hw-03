import SlimSelect from 'slim-select';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import noImage from './image/no-image.png';

const select = document.querySelector('.breed-select');
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

function toggleClass(element, isVisible) {
  element.classList.toggle('ss-hide', !isVisible);
}

async function handleBreedSelection() {
  try {
    const selectedBreedId = select.value;
    toggleClass(catInfo, false);
    toggleClass(spinner, true);

    const catData = await fetchCatByBreed(selectedBreedId);

    displayCatInfo(catData);
  } catch (error) {
    iziToast.show(errorMessage);
  }

  toggleClass(spinner, false);
}

function displayCatInfo(catData) {
  const { name, description, temperament, origin, country_code } =
    catData[0].breeds[0];

  const catImg = catData[0].url;

  catInfo.innerHTML = `
    <div class="wrapper">
      <img class="cat-img" src="${catImg}" alt="${name}"/>
      <div class="wrap">
        <h2 class="text">${name}</h2>
        <p><b class="primary">Description:</b> ${description}</p>
        <p><b class="primary">Temperament:</b> ${temperament}</p>
        <p><b class="primary">Country:</b> ${origin}</p>
        <img src="https://flagsapi.com/${country_code}/shiny/64.png" alt="${origin}" onerror="src='${noImage}'" style="width: 64px;">
      </div>
    </div>
  `;

  toggleClass(catInfo, true);
}

async function initializeApp() {
  try {
    await fetchBreeds().then(breeds => {
      const data = breeds.map(({ id, name }) => ({ text: name, value: id }));
      slimSelect.setData([{ placeholder: true, text: '' }, ...data]);
    });

    toggleClass(select, true);
    select.addEventListener('change', handleBreedSelection);
  } catch (error) {
    iziToast.show(errorMessage);
    toggleClass(select, false);
  }

  toggleClass(spinner, false);
}

initializeApp();
