import MovieItem from "./MovieItem";
import { useEffect, useState, useCallback, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_URL, API_KEY } from "../store/constants";

const MovieList = () => {
  const [movies, setMovies] = useState();

  const genreList = [53, 28, 18, 27, 99, 35, 37, 16];
  const genreNames = [
    "Newest",
    "Thriller",
    "Action",
    "Drama",
    "Horror",
    "Documentary",
    "Comedy",
    "Western",
    "Animation",
  ];
  let movieArray;

  const fetchMoviesHandler = useCallback(async () => {
    movieArray = [];

    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&release_date.gte=2022-11-01&with_watch_monetization_types=flatrate`
    );
    const data = await response.json();
    console.log(data);
    movieArray.push(data.results);

    for (const genre of genreList) {
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}&with_watch_monetization_types=flatrate`
      );
      const data = await response.json();
      console.log(movieArray);
      movieArray.push(data.results);
    }
    setMovies(movieArray);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return (
    <Fragment>
      {movies && (
        <Fragment>
          {genreNames.map((genre, i) => (
            <div className="container" key={genre}>
              <h2 className="mt-3">{genre}</h2>
              <div className="d-flex flex-row flex-nowrap overflow-auto">
                {movies[i].map((movie) => (
                  <div
                    key={movie.id}
                    className="card card-block mx-2"
                    style={{ minWidth: "280px" }}
                  >
                    <MovieItem
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      poster={movie.poster_path}
                      overview={movie.overview}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

export default MovieList;
