import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import { Form, Users } from "./app/containers";

export default function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Form} />
        <Route exact path="/users" component={Users} />
      </Switch>
    </HashRouter>
  );
}
