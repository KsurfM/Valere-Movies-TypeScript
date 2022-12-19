import "bootstrap/dist/css/bootstrap.min.css";
import AppContext from "../store/app-context";
import { useParams } from "react-router-dom";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import { BASE_IMG_URL, BASE_URL, API_KEY } from "../store/constants";

const MovieDetails = (props) => {
  const params = useParams();
  const movieId = Number(params.movieId);
  const [movieImages, setMovieImages] = useState();
  const [movieDetailsAndTrailers, setMovieDetailsAndTrailers] = useState();
  const appCtx = useContext(AppContext);

  const fetchImagesHandler = useCallback(async () => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}&language=en-US&include_image_language=en,null `
    );
    const data = await response.json();
    setMovieImages(data);
  }, [movieId]);

  const fetchMovieDetailsAndTrailersHandler = useCallback(async () => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
    );
    const data = await response.json();
    setMovieDetailsAndTrailers(data);
  }, [movieId]);

  useEffect(() => {
    fetchImagesHandler();
    fetchMovieDetailsAndTrailersHandler();
  }, [fetchImagesHandler, fetchMovieDetailsAndTrailersHandler]);

  return (
    <Fragment>
      {movieImages && (
        <div className="container">
          <Carousel>
            {movieImages.backdrops.map((backdrop, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={`${BASE_IMG_URL}${backdrop.file_path}`}
                  alt="First slide"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}

      {movieDetailsAndTrailers && (
        <Fragment>
          <div className="container">
            <h1 className="mt-5 mb-3">{`${
              movieDetailsAndTrailers.title
            }\n(${movieDetailsAndTrailers.release_date.slice(0, 4)})`}</h1>
          </div>
          <div className="container ">
            <div className="row">
              <div className="col-4 ">
                <img
                  src={`${BASE_IMG_URL}${movieDetailsAndTrailers.poster_path}`}
                  className="img-thumbnail"
                  alt="movie-poster"
                />
                <div
                  className="container d-flex justify-content-around border rounded p-2 mt-1 align-items-center"
                  style={{ height: "3rem" }}
                >
                  {appCtx.favourites.includes(movieId) ? (
                    <h5>Remove from favourites</h5>
                  ) : (
                    <h5>Add to favourites</h5>
                  )}

                  <button
                    onClick={appCtx.toggleFavourites.bind(null, movieId)}
                    className="btn "
                  >
                    {appCtx.favourites.includes(movieId) ? (
                      <BsBookmarkStarFill size={28} />
                    ) : (
                      <BsBookmarkStar size={28} />
                    )}
                  </button>
                </div>
                <div
                  className="container d-flex flex justify-content-left border rounded p-2 mt-1 align-items-center text-light bg-secondary"
                  style={{ height: "2.5rem" }}
                >
                  <h6>{`${movieDetailsAndTrailers.runtime} minutes`}</h6>
                </div>
                <div
                  className="container d-flex flex justify-content-left border rounded p-2 mt-1 align-items-center text-light bg-secondary"
                  style={{ height: "2.5rem" }}
                >
                  <h6>{movieDetailsAndTrailers.release_date}</h6>
                </div>
              </div>
              <div className="col-sm ">
                <h2>Overview:</h2>
                <h3>{movieDetailsAndTrailers.overview}</h3>
                <div
                  className="bg-secondary rounded d-flex justify-content-around align-items-center mt-4 "
                  style={{ height: "3rem" }}
                >
                  {movieDetailsAndTrailers.genres.map((genre) => (
                    <h4 key={genre.id} className="text-light ">
                      {genre.name}
                    </h4>
                  ))}
                </div>
                <div className="ratio ratio-16x9 mt-4 ">
                  <iframe
                    src={`https://www.youtube.com//embed/${movieDetailsAndTrailers.videos.results[0]?.key}`}
                    title="YouTube video"
                    allowFullScreen={true}
                  ></iframe>
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
