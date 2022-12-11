import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import classes from "./MovieItem.module.css";

const MovieItem = (props) => {
  const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";
  const [isFavourite, setIsFavourite] = useState(false);

  const addToFavouritesHandler = () => {
    setIsFavourite((prevState) => !prevState);
  };

  return (
    <div className={`card ${classes.containerx}`} style={{ width: "280px" }}>
      <img
        src={`${BASE_IMG_URL}${props.poster}`}
        className="card-img-top"
        alt={props.title}
      />
      <div className={`card-body ${classes.overlay}  `}>
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.overview}</p>
      </div>

      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between">
          <a href="#" className="card-link">
            Show details
          </a>

          <button onClick={addToFavouritesHandler} className="btn btn primary">
            {isFavourite ? (
              <BsBookmarkStarFill size={28} />
            ) : (
              <BsBookmarkStar size={28} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
