import { Fragment } from "react";
import Hero from "../home/Hero";
import Steps from "../home/Steps";
import Footer from "../home/Footer";

const Homepage = () => {
  return (
    <Fragment>
      <Hero></Hero>
      <Steps></Steps>
      <Footer></Footer>
    </Fragment>
  );
};

export default Homepage;
