import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieCast from '../components/MovieCast';
import MovieReviews from '../components/MovieReviews';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  const fetchMovieById = async movieId => {
    try {
      const response = await fetch(`https://api.example.com/movies/${movieId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchMovieById(movieId);

        if (movieData) {
          setMovie(movieData);
          setCast(movieData.cast);
          setReviews(movieData.reviews);
        } else {
          console.error('Failed to fetch movie data');
        }
      } catch (error) {
        console.error('Error fetching movie data', error);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div>
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <MovieCast cast={cast} />
          <MovieReviews reviews={reviews} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetailsPage;
