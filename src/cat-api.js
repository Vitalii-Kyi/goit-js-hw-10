export async function fetchBreeds() {
const apiUrl = 'https://api.thecatapi.com/v1/breeds';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
    throw new Error('Failed to fetch cat breeds.');
    }

    const data = await response.json();

    return data.map(({ id, name }) => ({
    value: id,
    label: name,
    }));
  } catch (error) {
    console.error('Error fetching cat breeds:', error);
    return [];
    }
}

export async function fetchCatByBreed(breedId) {
const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=live_c3CIOwThsgb0YpnCDSyQ1eFfUyQxYNm1CCNIsHqaXCcFYCbobcjdcj4iC4wWqKtx`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
    throw new Error('Failed to fetch cat by breed.');
    }

    const [cat] = await response.json();
    return cat;
  } catch (error) {
    console.error('Error fetching cat data:', error);
    throw error;
  }
}