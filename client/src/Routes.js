import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from './Home.js';
import Login from './Login.js';
import About from './About';
import Register from './Register';
import Header from './Header';

const Routes = () => {

    return (
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/login" component={Login} />
                <Route exact path='/register' component={Register} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default Routes;