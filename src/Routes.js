import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import { Demo } from "./app/containers";

export default function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Demo} />
      </Switch>
    </HashRouter>
  );
}
