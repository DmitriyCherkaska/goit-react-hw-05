import MovieList from '../MovieList/MovieList.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_READ_ACCESS_TOKEN } from '../../api/articles-api.js';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSearchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
            },
          },
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching search movies:', error);
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
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
