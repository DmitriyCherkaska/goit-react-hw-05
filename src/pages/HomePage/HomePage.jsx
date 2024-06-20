// import axios from 'axios';
import { getPopularMovies } from '../../api/articles-api.js';
import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList.jsx';
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getPopularMovies('cat');
        setMovies(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        setError('Error fetching popular movies. Please try again later.');
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <h2>Popular Movies</h2>
      {loading && <Loader />}
      {isError && <Error errorType={error} />}
      {!loading && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
