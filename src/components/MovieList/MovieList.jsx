import { Link, useLocation } from 'react-router-dom';
// import style from './MovieList.module.css';

// const defaultImg =
//   'https://kartinki.pics/uploads/posts/2022-12/1670423217_3-kartinkin-net-p-kartinka-serdtse-v-rukakh-oboi-4.jpg';

const MovieList = ({ movies }) => {
  const location = useLocation();

  const imageBaseUrl =
    'https://kartinki.pics/uploads/posts/2022-12/1670423217_3-kartinkin-net-p-kartinka-serdtse-v-rukakh-oboi-4.jpg';

  let movieArray = movies;
  if (!Array.isArray(movies)) {
    movieArray = Object.values(movies);
  }

  return (
    <div>
      <ul>
        {movieArray &&
          movieArray.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={location}>
                {movie.poster_path && (
                  <img
                    src={`${imageBaseUrl}${movie.poster_path}`}
                    alt={movie.title}
                    style={{ width: '100px', marginRight: '10px' }}
                  />
                )}
                {movie.title}
                {movie.vote_average}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default MovieList;
