import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Fragment } from "react";
import { FaApplePay, FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-start bg-light pt-3 pb-3  ">
          <div className="col d-flex justify-content-start align-items-center gap-3 ms-3">
            <FaApplePay size={50} />
            <FaPaypal size={40} />
            <FaCcVisa size={40} />
            <FaCcMastercard size={40} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
