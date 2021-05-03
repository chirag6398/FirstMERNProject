import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../components/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import Contact from "../components/Contact";
import About from "../components/About";
import Logout from "../components/Logout";
import ErrorPage from "../components/ErrorPage";
export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/contact">
        <Contact />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/logout">
        <Logout />
      </Route>
      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  );
}
