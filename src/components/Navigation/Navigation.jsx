import { Link } from 'react-router-dom';
import style from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" exact="true" className={style.title}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/movies" className={style.title}>
            Movies
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
