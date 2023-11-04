import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_URYiUDVMJKnsTYSLnYWeR31PUeH8c5Yz2b0ev0a1MU6oS9U6mrAOkeE6lCc4s4wU';

export async function fetchBreeds() {
  return await axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data);
}

export async function fetchCatByBreed(breedId) {
  return await axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data);
}
