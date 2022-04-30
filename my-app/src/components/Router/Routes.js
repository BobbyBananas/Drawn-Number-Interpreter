// The Router Network that links the paces to their respective web addresses

import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

//The Default Landing Page
import Home from "./pages/Home";

//Other Pages
import Interpreter from "./pages/Interpreter";


export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Interpreter" component={Interpreter} />
                </Switch>
            </Router>
        )
    }
}