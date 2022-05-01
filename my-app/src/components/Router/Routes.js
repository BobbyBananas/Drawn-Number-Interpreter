// The Router Network that links the paces to their respective web addresses
// Todo: Refactor to new version of react router dom

import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from '../history';

//The Landing Pages
import Home from "../../pages/Home/Home";
import Interpreter from "../../pages/Interpreter/Interpreter";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Interpreter} />
                    <Route path="/Interpreter" component={Interpreter} />
                </Switch>
            </Router>
        )
    }
}