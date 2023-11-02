import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_URYiUDVMJKnsTYSLnYWeR31PUeH8c5Yz2b0ev0a1MU6oS9U6mrAOkeE6lCc4s4wU';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorInfo = document.querySelector('.error');

errorInfo.style.color = 'red';

function hideElement(element) {
  element.style.display = 'none';
}

function showElement(element) {
  element.style.display = 'block';
}

function fetchBreeds() {
  showElement(loader);
  hideElement(breedSelect);
  hideElement(errorInfo);

  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      showElement(breedSelect);
      return response.data;
    })
    .catch(error => {
      showElement(errorInfo);
      throw error;
    })
    .finally(() => hideElement(loader));
}

function fetchCatByBreed(breedId) {
  showElement(loader);
  hideElement(errorInfo);

  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      showElement(errorInfo);
      throw error;
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

function handleBreedSelection() {
  const selectedBreedId = breedSelect.value;

  fetchCatByBreed(selectedBreedId)
    .then(catData => displayCatInfo(catData))
    .catch(error => {
      showElement(errorInfo);
      throw error;
    });
}

export function initializeApp() {
  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(error => {
      showElement(errorInfo);
      throw error;
    });

  breedSelect.addEventListener('change', handleBreedSelection);
}

initializeApp();
