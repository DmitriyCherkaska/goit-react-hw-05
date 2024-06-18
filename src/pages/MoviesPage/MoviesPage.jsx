import MovieList from '../../components/MovieList/MovieList.jsx';
import { useState, useEffect } from 'react';
// import axios from 'axios';
import { getPopularMovies } from '../../api/articles-api.js';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSearchMovies = async () => {
      try {
        const data = await getPopularMovies('cat');
        setMovies(data);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        setErrorMessage(
          'Error fetching popular movies. Please try again later.',
        );
      }
    };

    fetchSearchMovies();
  }, [searchQuery]);

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <input type="text" value={searchQuery} onChange={handleSearchChange} />
      {errorMessage ? (
        <div style={{ color: 'red' }}>{errorMessage}</div>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default MoviesPage;
