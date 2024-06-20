import style from './MovieDetailsPage.module.css';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import clsx from 'clsx';
import { BiArrowFromRight } from 'react-icons/bi';
import { fetchMovieDetails } from '../../api/articles-api';
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';
import { Suspense, useEffect, useRef, useState } from 'react';

const buildLinkClass = ({ isActive }) => {
  return clsx(style.link, isActive && style.active);
};

const defaultImg =
  'https://isz.minsk.by/upload/medialibrary/cb5/cb5e831088ab58cf5447f2b64732cd22.jpg';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const backLink = location.state ?? '/movies';

  const navLinkCasts = useRef();
  const navLinkReviews = useRef();

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
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
    <div className={style.wrapper}>
      <Link to={backLink} outline="none">
        <div className={style.backBtn}>
          <BiArrowFromRight color="rgb(196, 205, 219)" outline="none" />
          <span className={style.span}>Go back</span>
        </div>
      </Link>
      {loading && <Loader />}
      {isError && <Error errorType={error} />}
      {!loading && movie && (
        <div className={style.movieDetails}>
          <div>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : defaultImg
              }
              width={400}
              alt={movie.title}
            />
          </div>
          <div className={style.description}>
            <h1 className={style.title}>{movie.title}</h1>
            <p className={style.overview}>{movie.overview}</p>
            <div className={style.info}>
              <p>
                Release Date:{' '}
                <span className={style.span}>{movie.release_date}</span>
              </p>
              <p>
                Rating: <span className={style.span}>{movie.vote_average}</span>
              </p>
            </div>
            <div className={style.nav}>
              <NavLink
                ref={navLinkCasts}
                to="cast"
                state={location.state}
                className={buildLinkClass}
              >
                <div className={style.backBtn}>Cast</div>
              </NavLink>
              <NavLink
                ref={navLinkReviews}
                to="reviews"
                state={location.state}
                className={buildLinkClass}
              >
                <div className={style.backBtn}>Reviews</div>
              </NavLink>
            </div>
          </div>
        </div>
      )}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
export default MovieDetailsPage;
