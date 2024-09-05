import React from "react";
import FooterOne from "../components/Footer/FooterOne";
import HeaderOne from "../components/Header/HeaderOne";
import PageLoader from "../components/PageLoader/PageLoader";
import cn from "classnames";

const LayoutOne = (props) => {
  return (
    <div className={cn("")} style={{ position: "relative" }}>
      <PageLoader />

      <HeaderOne />

      <div> {/* Adjust margin to make space for the header */}
        {props.children}
      </div>

      <FooterOne />
    </div>
  );
};

export default LayoutOne;
