const HomePage = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGI5YzQwYTU1YTc5MTQ2M2VlNGQ1ZWZjYjk1OWE5MiIsInN1YiI6IjY2NmYxODIzYmUwYThkY2Y5YzkzMGMwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hhnRXCL3m7Wky9HcRgX6zFoMzK2BaBQHiqwxUYnFI-4',
    },
  };

  fetch(
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
    options,
  )
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

  return <div>HomePage</div>;
};

export default HomePage;
