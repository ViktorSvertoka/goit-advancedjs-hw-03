import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_URYiUDVMJKnsTYSLnYWeR31PUeH8c5Yz2b0ev0a1MU6oS9U6mrAOkeE6lCc4s4wU';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function hideElement(element) {
  element.style.display = 'none';
}

function showElement(element) {
  element.style.display = 'block';
}

async function fetchBreeds() {
  showElement(loader);
  hideElement(catInfo);
  hideElement(error);

  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    hideElement(loader);
  }
}

async function fetchCatByBreed(breedId) {
  showElement(loader);
  hideElement(catInfo);
  hideElement(error);

  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    hideElement(loader);
  }
}

function displayCatInfo(catData) {
  catInfo.innerHTML = `
    <img src="${catData[0].url}" alt="Cat Image" style="width: 350px; height: 350px;" />
    <h2>${catData[0].breeds[0].name}</h2>
    <p>Description: ${catData[0].breeds[0].description}</p>
    <p>Temperament: ${catData[0].breeds[0].temperament}</p>
  `;
  showElement(catInfo);
}

async function handleBreedSelection() {
  const selectedBreedId = breedSelect.value;

  try {
    const catData = await fetchCatByBreed(selectedBreedId);
    displayCatInfo(catData);
  } catch (error) {
    showElement(error);
  }
}

export async function initializeApp() {
  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    showElement(error);
  }

  breedSelect.addEventListener('change', handleBreedSelection);
}

initializeApp();
