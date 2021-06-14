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
import MuudaProfiili from "./MuudaProfiili.js";
import OppematerjalidKuvamine from "./OppematerjalidKuvamine.js";
import Teated from "./Teated.js";

const Routes = () => {

    return (
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                <Route exact path="/" component={Teated} />
                <Route exact path="/about" component={About} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/kysimustikud" component={KysimustikuValik} />
                <Route exact path="/login" component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/contact' component={Contact} />
                <Route exact path='/lisa-oppematerjal' component={Oppematerjal} />
                <Route exact path='/muudaprofiili' component={MuudaProfiili} />
                <Route exact path='/oppematerjalid' component={OppematerjalidKuvamine} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default Routes;