import MovieItem from "./MovieItem";
import { useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const fetchMoviesHandler = useCallback(async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/search/multi?api_key=d76141fc516005c4b21c33a7c4f13e2f&language=en-US&query=Star%20Wars&page=1&include_adult=true"
    );
    const data = await response.json();

    setMovies(data.results);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return (
    <div className="container">
      <h2 className="mt-3">Star Wars</h2>
      <div className="d-flex flex-row flex-nowrap overflow-auto">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="card card-block mx-2"
            style={{ minWidth: "280px" }}
          >
            <MovieItem
              key={movie.id}
              title={movie.original_title}
              poster={movie.poster_path}
              overview={movie.overview}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
