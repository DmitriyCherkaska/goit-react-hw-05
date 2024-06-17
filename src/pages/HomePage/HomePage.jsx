import { API_READ_ACCESS_TOKEN } from '../../api/articles-api.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../MovieList/MovieList.jsx';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/week',
          {
            headers: {
              Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
            },
          },
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        setErrorMessage(
          'Error fetching popular movies. Please try again later.',
        );
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>
      {errorMessage ? (
        <div style={{ color: 'red' }}>{errorMessage}</div>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default HomePage;
