import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./scss/style.scss";
import Layout from "./components/Layout";
import { Home, Posts, NewPost } from "./pages";

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
        <Route exact path="/" render={(props) => renderWithLayout(Home, props)} />
        <Route path="/posts" render={(props) => renderWithLayout(Posts, props)} />
        <Route path="/new-post" render={(props) => renderWithLayout(NewPost, props)} />
      </Switch>
    </Router>
  );
}
