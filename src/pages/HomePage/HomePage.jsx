// import axios from 'axios';
import style from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../api/articles-api.js';
import MovieList from '../../components/MovieList/MovieList.jsx';
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getTrendingMovies() {
      setLoading(true);
      try {
        const { results } = await fetchTrendingMovies();
        setMovies(results);
      } catch (error) {
        console.error('error in App', error);
        setError(error.message);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }
    getTrendingMovies();
  }, []);

  return (
    <>
      <h2 className={style.title}>TRENDING MOVIES</h2>
      {loading && <Loader />}
      {isError && <Error errorType={error} />}
      {!loading && <MovieList movies={movies} />}
    </>
  );
};

export default HomePage;
