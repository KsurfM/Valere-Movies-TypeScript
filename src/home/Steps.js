import "bootstrap/dist/css/bootstrap.min.css";
import { TbNumber1, TbNumber2, TbNumber3 } from "react-icons/tb";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const Steps = () => {
  return (
    <Fragment>
      <div className="row border-top border-dark  pt-3 pb-3 d-flex align-items-center">
        <div className="col-2 ms-4">
          <TbNumber1 size={150} style={{ color: "#0275d8" }} />
        </div>
        <div className="col ms-5 me-4">
          <h2>
            Sign up for free, connect your social media accounts and your smart
            watch.
          </h2>
        </div>
      </div>
      <div className="row border-top border-dark pt-3 pb-3 d-flex align-items-center">
        <div className="col-2 ms-4 ">
          <TbNumber2 size={150} style={{ color: "#0275d8" }} />
        </div>
        <div className="col ms-4 me-4">
          <h2>
            Let our state of the art AI engine do its magic by analyzing your
            profile and smartwatch logs.
          </h2>
        </div>
      </div>
      <div className="row border-top border-bottom  border-dark pt-3 pb-3 d-flex align-items-center">
        <div className="col-2 ms-4">
          <TbNumber3 size={150} style={{ color: "#0275d8" }} />
        </div>
        <div className="col ms-4 me-4">
          <h2>
            Enjoy highly personalized movie recommendations while being sure
            that your data stays yours - we use blockchain technology to
            securely store your data.
          </h2>
        </div>
      </div>
      <div className="container">
        <div className="row container border-top pt-3 pb-3 d-flex align-items-center">
          <div className="col "></div>
          <div className="col-3 pt-5 pb-5 ">
            <Link
              className="btn btn-primary ms-5"
              to="/discover"
              style={{ fontSize: "1.5rem" }}
            >
              <strong>Start Now!</strong>
            </Link>
          </div>
          <div className="col "></div>
        </div>
      </div>
    </Fragment>
  );
};

export default Steps;
