import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";

const propTypes = {
  children: PropTypes.node.isRequired,
};

const defaultProps = {};

export default function component(props) {
  const { children } = props;

  return (
    <div>
      <Header />
      <div className="sb-site"></div>

      <div className="card">{children}</div>
      <Footer />
    </div>
  );
}

component.propTypes = propTypes;
component.defaultProps = defaultProps;