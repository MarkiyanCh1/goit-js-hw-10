const URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_M6pseuCT3lhvRqEjQAbYcXkSKTuPxbv7y4rZ0ofD1kL9cVHCtdoCBxEUIj6xBU1Y';

export function fetchBreeds() {
  return fetch(`${URL}/breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
