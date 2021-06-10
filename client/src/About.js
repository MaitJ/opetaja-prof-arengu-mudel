import React from 'react'; 
import Profilecard from './Profilecard';
import { NavLink } from "react-router-dom";
import {Switch, Route} from 'react-router-dom';

const About = () => {
    return (
        <section className="profile-about">
            <Switch>
                <Profilecard/>
            </Switch>
            <section className='about'>
                <h2>See on About page ja siin on lambine info</h2>
                <p>Lorem ipsum dolor Rem illo debitis nihil doloremque aliquam dolor consequatur eveniet, porro quaerat quidem eum consectetur explicabo quibusdam tempora, similique nisi.</p>
            </section>
        </section>
    )
}

export default About;