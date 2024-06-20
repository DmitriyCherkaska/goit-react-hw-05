import { Link } from 'react-router-dom';
import style from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav>
      <ul className={style.list}>
        <li className={style.item}>
          <Link to="/" exact="true" className={style.titleOne}>
            Home
          </Link>
        </li>
        <li className={style.item}>
          <Link to="/movies" className={style.titleTwo}>
            Movies
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
