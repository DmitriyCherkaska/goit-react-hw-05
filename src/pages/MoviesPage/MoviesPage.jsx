// import style from './MoviesPage.module.css';
import { useEffect, useState } from 'react';
import { searchMovies } from '../../api/articles-api.js';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import FormSearch from '../../components/FormSearch/FormSearch';
import MessageText from '../../components/MessageText/MessageText';
import RequestNotFound from '../../components/RequestNotFound/RequestNotFound';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

const MoviesPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isNoText, setIsNoText] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const text = searchParams.get('text');

  useEffect(() => {
    if (text === '') {
      setIsNoText(true);
      return;
    }

    async function getSearchMovies() {
      setLoading(true);
      try {
        const { results } = await searchMovies(text);
        setMovies(results);
        setIsNoText(false);
        results.length === 0 && setIsEmpty(true);
      } catch (error) {
        console.error('error in App', error);
        setError(error.message);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }
    text && getSearchMovies();
  }, [text]);

  const searchMovie = textInput => {
    setSearchParams({ text: textInput });
    setIsEmpty(false);
    setMovies([]);
  };
  return (
    <>
      <div>
        <FormSearch submit={searchMovie} />
        {isNoText && <MessageText />}
        {isError && <Error errorType={error} />}
        {loading && <Loader />}
        {isEmpty && !loading && <RequestNotFound />}
      </div>
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
};
export default MoviesPage;
