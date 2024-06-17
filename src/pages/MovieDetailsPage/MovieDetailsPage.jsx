import MovieCast from '../../components/MovieCast/MovieCast.jsx';
import MovieReviews from '../../components/MovieReviews/MovieReviews.jsx';
import { getPopularMovies } from '../../api/articles-api.js';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MovieDetailsPage = ({ match }) => {
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [apiToken, setApiToken] = useState('');

  useEffect(() => {
    const fetchApiToken = async () => {
      try {
        const token = await getPopularMovies();
        setApiToken(token);
      } catch (error) {
        console.error('Ошибка получения токена API:', error);
      }
    };

    fetchApiToken();
  }, []);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const responses = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${match.params.movieId}`,
            {
              headers: {
                Authorization: `Bearer ${apiToken}`,
              },
            },
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${match.params.movieId}/credits`,
            {
              headers: {
                Authorization: `Bearer ${apiToken}`,
              },
            },
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${match.params.movieId}/reviews`,
            {
              headers: {
                Authorization: `Bearer ${apiToken}`,
              },
            },
          ),
        ]);

        setMovie(responses[0].data);
        setCast(responses[1].data.cast);
        setReviews(responses[2].data.results);
      } catch (error) {
        console.error('Ошибка извлечения данных фильма:', error);
      }
    };

    if (match.params.movieId && apiToken) {
      fetchMovieData();
    }
  }, [match.params.movieId, apiToken]);

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <MovieCast cast={cast} />
      <MovieReviews reviews={reviews} />
    </div>
  );
};

export default MovieDetailsPage;
