import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";

const MovieDetails = (props) => {
  const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";
  const params = useParams();
  const movieId = params.movieId;
  const [movieImages, setMovieImages] = useState();
  const [movieDetailsAndTrailers, setMovieDetailsAndTrailers] = useState();
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFavouritesHandler = () => {
    setIsFavourite((prevState) => !prevState);
    if (!localStorage.getItem(movieId)) {
      localStorage.setItem(`${movieId}`, true);
    } else {
      localStorage.removeItem(`${movieId}`);
    }
  };

  const fetchImagesHandler = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=d76141fc516005c4b21c33a7c4f13e2f&language=en-US&include_image_language=en,null `
    );
    const data = await response.json();
    setMovieImages(data);
  };

  const fetchMovieDetailsAndTrailersHandler = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=d76141fc516005c4b21c33a7c4f13e2f&language=en-US&append_to_response=videos`
    );
    const data = await response.json();
    setMovieDetailsAndTrailers(data);
    console.log(data);
  };

  useEffect(() => {
    fetchImagesHandler();
    fetchMovieDetailsAndTrailersHandler();
  }, []);

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
                  {localStorage.getItem(movieId) ? (
                    <h5>Remove from favourites</h5>
                  ) : (
                    <h5>Add to favourites</h5>
                  )}

                  <button onClick={toggleFavouritesHandler} className="btn ">
                    {localStorage.getItem(movieId) ? (
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
                  {/* <h5>Runtime:&nbsp; </h5> */}
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
