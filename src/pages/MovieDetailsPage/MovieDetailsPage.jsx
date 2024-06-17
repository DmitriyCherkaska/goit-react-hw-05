import MovieCast from '../../components/MovieCast/MovieCast.jsx';
import MovieReviews from '../../components/MovieReviews/MovieReviews.jsx';
import { API_READ_ACCESS_TOKEN } from '../../api/articles-api.js';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MovieDetailsPage = ({ match }) => {
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const responses = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${match.params.movieId}`,
            {
              headers: {
                Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
              },
            },
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${match.params.movieId}/credits`,
            {
              headers: {
                Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
              },
            },
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${match.params.movieId}/reviews`,
            {
              headers: {
                Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
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

    if (match.params.movieId) {
      fetchMovieData();
    }
  }, [match.params.movieId, API_READ_ACCESS_TOKEN]);

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
