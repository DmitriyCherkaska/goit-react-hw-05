import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_READ_ACCESS_TOKEN } from '../../api/articles-api.js';
import MovieCast from '../../components/MovieCast/MovieCast.jsx';
import MovieReviews from '../../components/MovieReviews/MovieReviews.jsx';

const MovieDetailsPage = ({ match }) => {
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${match.params.movieId}`,
          {
            headers: {
              Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
            },
          },
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [match.params.movieId]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${match.params.movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
            },
          },
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
      }
    };

    fetchMovieCast();
  }, [match.params.movieId]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${match.params.movieId}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
            },
          },
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
      }
    };

    fetchMovieReviews();
  }, [match.params.movieId]);

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
