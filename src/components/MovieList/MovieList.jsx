const MovieList = ({ movies }) => {
  return (
    <div>
      <h2>Movies</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
