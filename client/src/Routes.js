import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from './Home.js';
import Login from './Login.js';
import About from './About';
import Register from './Register';
import Header from './Header';
import KysimustikuValik from "./KysimustikuValik.js";
import Profile from "./Profile.js";
import Contact from "./Contact.js";
import Oppematerjal from "./Oppematerjal.js";

const Routes = () => {

    return (
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/kysimustikud" component={KysimustikuValik} />
                <Route exact path="/login" component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/contact' component={Contact} />
                <Route exact path='/lisa-oppematerjal' component={Oppematerjal} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default Routes;