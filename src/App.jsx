import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/movies" component={MoviesPage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
