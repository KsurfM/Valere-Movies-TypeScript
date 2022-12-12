import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

const MovieDetails = (props) => {
  const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";
  const params = useParams();
  const movieId = params.movieId;
  const [movieImages, setMovieImages] = useState();
  const [movieDetails, setMovieDetails] = useState();

  const fetchImagesHandler = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=d76141fc516005c4b21c33a7c4f13e2f`
    );
    const data = await response.json();
    setMovieImages(data);
  };

  const fetchMovieDetailsHandler = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=d76141fc516005c4b21c33a7c4f13e2f&language=en-US`
    );
    const data = await response.json();
    setMovieDetails(data);
    console.log(data);
    console.log(data.poster_path);
  };

  useEffect(() => {
    fetchImagesHandler();
    fetchMovieDetailsHandler();
  }, []);

  return (
    <Fragment>
      {movieImages && (
        <div className="container" style={{ height: "50%" }}>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`${BASE_IMG_URL}${movieImages.backdrops[0].file_path}`}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`${BASE_IMG_URL}${movieImages.backdrops[1].file_path}`}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`${BASE_IMG_URL}${movieImages.backdrops[2].file_path}`}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      )}
      {movieDetails && (
        <Fragment>
          <div className="container">
            <h1 className="mt-5 mb-3">{`${
              movieDetails.title
            }\n(${movieDetails.release_date.slice(0, 4)})`}</h1>
          </div>
          <div className="container ">
            <div className="row">
              <div className="col-4">
                <img
                  src={`${BASE_IMG_URL}${movieDetails.poster_path}`}
                  className="img-thumbnail"
                  alt="..."
                />
              </div>
              <div className="col-sm ">
                <h2>Overview:</h2>
                <h3>{movieDetails.overview}</h3>
                <div
                  className="bg-secondary rounded d-flex justify-content-around align-items-center mt- "
                  style={{ height: "3rem" }}
                >
                  {movieDetails.genres.map((genre) => (
                    <h4 key={genre.id} className="text-light ">
                      {genre.name}
                    </h4>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MovieDetails;
