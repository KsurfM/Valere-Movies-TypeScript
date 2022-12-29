import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "../style/Hero.module.css";

const Hero: React.FC = () => {
  return (
    <Fragment>
      <div className={classes.heroSection}>
        <div className={classes.heroSection_box}>
          <div className={classes.heroSection_box_left}>
            <h1>
              Don't waste time choosing the perfect movie. Let our state of the
              art AI engine do the job for you.
            </h1>
            <p>Get a 14-day free trial.</p>
            <Link to="/discover" className="btn btn-primary">
              <strong>Discover Movies</strong>
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
