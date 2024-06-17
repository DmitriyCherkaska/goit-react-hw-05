import axios from 'axios';

const API_READ_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGI5YzQwYTU1YTc5MTQ2M2VlNGQ1ZWZjYjk1OWE5MiIsInN1YiI6IjY2NmYxODIzYmUwYThkY2Y5YzkzMGMwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hhnRXCL3m7Wky9HcRgX6zFoMzK2BaBQHiqwxUYnFI-4';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const getPopularMovies = async query => {
  const { data } = await axios.get(`/search/movie`, {
    params: {
      query,
      language: 'en-US',
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
    },
  });
  return data;
};
