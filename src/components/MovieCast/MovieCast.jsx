// import ButtonUp from '../ButtonUp/ButtonUp';
// import style from './MovieCast.module.css';
import { useEffect, useRef, useState } from 'react';
import { getPopularMovies } from '../../api/articles-api';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import MessageCasts from '../MessageCasts/MessageCasts';

const defaultImg =
  'https://isz.minsk.by/upload/medialibrary/cb5/cb5e831088ab58cf5447f2b64732cd22.jpg';

const MovieCast = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [casts, setCasts] = useState([]);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const firstCastsRef = useRef(null);
  useEffect(() => {
    if (casts.length > 0 && firstCastsRef.current) {
      const { height } = firstCastsRef.current.getBoundingClientRect();
      window.scrollBy({ top: height * 2, behavior: 'smooth' });
    }
  }, [casts]);

  useEffect(() => {
    async function getMovieDetails() {
      setLoading(true);
      try {
        const { cast } = await getPopularMovies(movieId);
        setCasts(cast);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovieDetails();
  }, [movieId]);

  return (
    <section>
      {isError && <Error errorType={error} />}
      {loading && <Loader />}
      {casts.length === 0 && <MessageCasts />}
      {casts.length > 0 && (
        <ul>
          {casts.map((el, index) => {
            return (
              <li key={el.id} ref={index === 0 ? firstCastsRef : null}>
                <div>
                  <img
                    src={
                      el.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${el.profile_path}`
                        : defaultImg
                    }
                    width={300}
                    alt={el.name}
                  />
                </div>
                <div>
                  <p>{el.original_name}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
export default MovieCast;
