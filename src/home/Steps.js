import "bootstrap/dist/css/bootstrap.min.css";
import { TbNumber1, TbNumber2, TbNumber3 } from "react-icons/tb";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Fragment } from "react";

const Steps = () => {
  return (
    <Fragment>
      <div className="row border-top  d-flex align-items-center">
        <div className="col-2 ms-3">
          <TbNumber1 size={150} />
        </div>
        <div className="col ms-5">
          <h2>
            Connect your social media with one click. Our AI will analyze your
            profile......
          </h2>
        </div>
      </div>
      <div className="row border-top  d-flex align-items-center">
        <div className="col ms-5">
          <h2>
            Connect your social media with one click. Our AI will analyze your
            profile......
          </h2>
        </div>
        <div className="col-2 me-5">
          <TbNumber2 size={150} />
        </div>
      </div>
      <div className="row border-top  d-flex align-items-center">
        <div className="col-2 ms-3">
          <TbNumber3 size={150} />
        </div>
        <div className="col ms-5 ">
          <h2>
            Connect your social media with one click. Our AI will analyze your
            profile......
          </h2>
        </div>
      </div>
    </Fragment>
  );
};

export default Steps;
