import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useContext } from "react";
import AppContext from "./store/app-context";
import { useHistory } from "react-router-dom";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import classes from "./MovieItem.module.css";

const MovieItem = (props) => {
  const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";
  const [isFavourite, setIsFavourite] = useState(false);
  const history = useHistory();
  const appCtx = useContext(AppContext);

  const addToFavouritesHandler = () => {
    setIsFavourite((prevState) => !prevState);
    if (!localStorage.getItem(props.id)) {
      localStorage.setItem(`${props.id}`, true);
    } else {
      localStorage.removeItem(`${props.id}`);
    }
  };

  const showMovieDetailsHandler = () => {
    history.push("/" + props.id);
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
          <button
            onClick={showMovieDetailsHandler}
            className="btn btn-secondary"
          >
            Show details
          </button>

          <button onClick={addToFavouritesHandler} className="btn btn primary">
            {localStorage.getItem(props.id) ? (
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
