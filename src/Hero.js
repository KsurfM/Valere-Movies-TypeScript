import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment } from "react";
import classes from "./Hero.module.css";

const Hero = () => {
  const fetchMoviesHandler = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/search/multi?api_key=d76141fc516005c4b21c33a7c4f13e2f&language=en-US&query=Star%20Wars&page=1&include_adult=true"
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <Fragment>
      <div className={classes.heroSection}>
        <div className={classes.heroSection_box}>
          <div className={classes.heroSection_box_left}>
            <h1>Pass the burden of choosing a movie to someone else!</h1>
            <p>Valere Movies has your back!</p>
            <button onClick={fetchMoviesHandler} className="btn btn-primary">
              Start your search
            </button>
          </div>
          <div className={classes.heroSection_box_right}>
            <img
              src="https://www.lifeberrys.com/img/article/couple1-1612864408-lb.jpg"
              alt="couple watching a movie"
              width="100% "
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Hero;
