import MovieItem from "./MovieItem";
import { useEffect, useState, useCallback, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MovieList = () => {
  const [movies, setMovies] = useState([[], [], []]);

  const genreList = [53, 18, 28];
  let movieArray = [];

  const fetchMoviesHandler = useCallback(async () => {
    movieArray = [];

    for (const genre of genreList) {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=d76141fc516005c4b21c33a7c4f13e2f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_genres=${genre}&with_watch_monetization_types=flatrate`
      );
      const data = await response.json();
      movieArray.push(data.results);
    }
    setMovies(movieArray);
    console.log(movieArray);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return (
    <Fragment>
      <div className="container">
        <h2 className="mt-3">Thriller</h2>
        <div className="d-flex flex-row flex-nowrap overflow-auto">
          {movies[0].map((movie) => (
            <div
              key={movie.id}
              className="card card-block mx-2"
              style={{ minWidth: "280px" }}
            >
              <MovieItem
                key={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                overview={movie.overview}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="container">
        <h2 className="mt-3">Drama</h2>
        <div className="d-flex flex-row flex-nowrap overflow-auto">
          {movies[1].map((movie) => (
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
      <div className="container">
        <h2 className="mt-3">Action</h2>
        <div className="d-flex flex-row flex-nowrap overflow-auto">
          {movies[2].map((movie) => (
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
    </Fragment>
  );
};

export default MovieList;
