import Navigation from "./Navigation";
import React from "react";
import { Fragment } from "react";
const Layout: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <Fragment>
      <Navigation></Navigation>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
