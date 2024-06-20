import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navigation from './Navigation/Navigation';
import Loader from './Loader/Loader';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('../pages/MovieDetailsPage/MovieDetailsPage'),
);
const MovieCast = lazy(() => import('../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('../components/MessageReviews/MessageReviews'),
);
const NotFound = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

const App = () => {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
