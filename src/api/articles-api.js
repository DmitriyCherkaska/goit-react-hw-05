import axios from 'axios';

const API_KEY = 'nBjDx3M3zD2WrpPhfkSHVh1YXawb-uZYOaY5iVd1jYc';
axios.defaults.baseURL = 'https://api.unsplash.com';

const getPopularMovies = async (searchTerm = '', page) => {
  const params = new URLSearchParams({
    client_id: API_KEY,
    query: searchTerm,
    page,
    per_page: 12,
    orientation: 'landscape',
  });

  const { data } = await axios.get(`search/photos?${params}`);
  return data;
};

export default getPopularMovies;
