import { getPopularMovies } from '../../api/articles-api.js';
import { useState, useEffect } from 'react';
// import axios from 'axios';
import MovieList from '../MovieList/MovieList.jsx';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getPopularMovies('cat');
        setMovies(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        setErrorMessage(
          'Error fetching popular movies. Please try again later.',
        );
      }
    };

    getData();
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
