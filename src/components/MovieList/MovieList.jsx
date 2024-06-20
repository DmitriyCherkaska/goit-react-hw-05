// import style from './MovieList.module.css';
import { Link, useLocation } from 'react-router-dom';

const defaultImg =
  'https://isz.minsk.by/upload/medialibrary/cb5/cb5e831088ab58cf5447f2b64732cd22.jpg';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <>
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={location}>
                <div>
                  <div>
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                          : defaultImg
                      }
                      width={400}
                      alt={movie.title}
                    />
                  </div>

                  <div>
                    <p>{movie.title}</p>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default MovieList;
