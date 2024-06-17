import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage.jsx';
import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage.jsx';
import MoviesPage from '../pages/MoviesPage/MoviesPage.jsx';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.jsx';

import Navigation from '../components/Navigation/Navigation.jsx';
import MovieCast from '../components/MovieCast/MovieCast.jsx';
import MovieReviews from '../components/MovieReviews/MovieReviews.jsx';

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route exact path="/" component={HomePage} />
        <Route path="/movies" component={MoviesPage} />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Route path="/movies/:movieId/cast" component={MovieCast} />
        <Route path="/movies/:movieId/reviews" component={MovieReviews} />
        <Route component={NotFoundPage} />
      </Routes>
    </>
  );
};

export default App;
