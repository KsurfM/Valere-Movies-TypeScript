import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import AppContext from "../store/app-context";
import { useNavigate } from "react-router-dom";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import classes from "../style/MovieItem.module.css";
import { BASE_IMG_URL } from "../store/constants";

const MovieItem: React.FC<{
  id: number;
  key: number;
  title: string;
  poster?: string;
  overview: string;
}> = (props) => {
  const navigate = useNavigate();
  const appCtx = useContext(AppContext);

  const showMovieDetailsHandler = () => {
    navigate("/" + props.id);
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

          <button
            onClick={appCtx.toggleFavourites.bind(null, props.id)}
            className="btn btn primary"
          >
            {appCtx.favourites.includes(props.id) ? (
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
