import React from "react";
import { Switch, Route, HashRouter as Router, BrowserRouter } from "react-router-dom";
import GuestLanding from "./Components/GuestLanding";
import Home from "./Components/Home";
import Loading from "./Components/loading";

export default (
        <Switch>
            <Route exact path="/" component={GuestLanding}/>
            <Route path="/auth" component={Loading}/>
            <Route path="/home" render={(props) => <Home {...props}/>}/>
        </Switch>
)