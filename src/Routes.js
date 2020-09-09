import React from "react";
import { Switch, Route, HashRouter as Router, BrowserRouter } from "react-router-dom";
import GuestLanding from "./Components/GuestLanding";
import Home from "./Components/Home";

export default (
        <Switch>
            <Route exact path="/" component={GuestLanding}/>
            <Route path="/home" component={Home}/>
        </Switch>
)