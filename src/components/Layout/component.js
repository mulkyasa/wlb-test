import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";

const propTypes = {
  children: PropTypes.node.isRequired,
};

const defaultProps = {};

export default function Component(props) {
  const { children } = props;

  return (
    <div>
      <Header />
      <div className="sb-site"></div>

      <div className="container">
        <div className="container__wrapper">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

Component.propTypes = propTypes;
Component.defaultProps = defaultProps;
