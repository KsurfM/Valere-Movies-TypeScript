import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <Fragment>
      <div className={classes.heroSection}>
        <div className={classes.heroSection_box}>
          <div className={classes.heroSection_box_left}>
            <h1>Pass the burden of choosing a movie to someone else!</h1>
            <p>Valere Movies has your back!</p>
            <Link to="/discover" className="btn btn-primary">
              Discover Movies
            </Link>
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
