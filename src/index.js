import './css/common.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';

const breedSelect = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');

const populateBreedsSelect = (breeds) => {
breeds.forEach(({ value, label }) => {
    breedSelect.insertAdjacentHTML(
    'beforeend',
    `<option value="${value}">${label}</option>`
    );
});
  new SlimSelect({
    select: breedSelect,
    });
};

const displayCatInfo = ({ breeds, url }) => {
  const { name, origin, description, temperament, wikipedia_url } = breeds[0];

  catInfoContainer.innerHTML = `
    <img src="${url}" alt="Cat Image" width="1080" class="cat-image">
    <div class="cat-container-info">
      <h2 class="cat-name">Name: ${name}</h2>
      <h3 class="country">From: ${origin}</h3>
      <p class="cat-description">Description: ${description}</p>
      <p class="cat-temperament">Temperament: ${temperament}</p>
      <a href="${wikipedia_url}" class="wikipedia-link" target="_blank">Wikipedia</a>
    </div>
  `;
  
  loaderElement.classList.add('hidden');
catInfoContainer.classList.remove('hidden');
};

  const handleError = (error) => {
  loaderElement.classList.add('hidden');
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
};

const handleBreedSelectChange = async () => {
  const selectedBreedId = breedSelect.value;

  if (!selectedBreedId) {
    catInfoContainer.innerHTML = '';
    catInfoContainer.classList.add('hidden');
    return;
  }

  loaderElement.classList.remove('hidden');
  catInfoContainer.classList.add('hidden');

  try {
    const cat = await fetchCatByBreed(selectedBreedId);
    displayCatInfo(cat);
  } catch (error) {
    handleError(error);
  }
};

(async () => {
  try {
    const breeds = await fetchBreeds();
    populateBreedsSelect(breeds);
    loaderElement.classList.add('hidden');
  } catch (error) {
    handleError(error);
  }
})();

breedSelect.addEventListener('change', handleBreedSelectChange);