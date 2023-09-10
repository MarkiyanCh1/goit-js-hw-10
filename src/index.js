import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

Loading.hourglass('Loading...', {
  svgColor: '#f47a08',
  svgSize: '150px',
  messageFontSize: '40px',
});

createSelect();

function createSelect(data) {
  fetchBreeds(data)
    .then(data => {
      refs.select.style.display = 'flex';
      refs.loader.style.display = 'none';

      createMarkupOptins(data);
      new SlimSelect({
        select: refs.select,
      });
    })
    .catch(error => {
      Notify.failure(refs.error.textContent);
    })
    .finally(result => Loading.remove());
}

function createMarkupOptins(arr) {
  return arr
    .map(({ id, name }) => {
      const option = `<option value=${id}>${name}</option>`;
      refs.select.insertAdjacentHTML('beforeend', option);
    })
    .join('');
}

refs.select.addEventListener('change', event => {
  const id = event.currentTarget.value;

  Loading.hourglass('Loading...', {
    svgColor: '#f47a08',
    svgSize: '150px',
    messageFontSize: '40px',
  });

  fetchCatByBreed(id)
    .then(catData => {
      refs.catInfo.style.display = 'flex';
      createMarkupCards(catData);
    })
    .catch(error => {
      Notify.failure(refs.error.textContent);
    })
    .finally(result => Loading.remove());
});

function createMarkupCards(data) {
  const { breeds, url } = data[0];

  const card = `
      <img class="cat-img" src="${url}" alt="${breeds[0].name}"  >
      <div class="cat-right">
        <h1 class="name">${breeds[0].name}</h1>
        <p class="description">${breeds[0].description}</p>
        <p class="temperament"><span class="temperament-span">Temperament:</span> ${breeds[0].temperament}</p>
      </div>`;
  refs.catInfo.innerHTML = card;
}

