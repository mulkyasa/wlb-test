import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./scss/style.scss";
import Layout from "./components/Layout";
import routes from "./routes";

const renderWithLayout = (Component, props) => {
  return (
    <Layout {...props}>
      <Component {...props} />
    </Layout>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, idx) => {
          return (
            <Route
              key={idx}
              exact={route.exact}
              path={route.path}
              render={(props) => renderWithLayout(route.component, props)}
            />
          );
        })}
      </Switch>
    </Router>
  );
}
