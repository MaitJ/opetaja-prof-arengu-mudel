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
                <h2>Infot meie kohta</h2>
                <p>Oleme neljaliikmeline tiim, kes arendab projekti nimega "Opetaja professionaalne areng" nii kaugele kui suvepraktika ajaraames jõuab.</p>
            </section>
        </section>
    )
}

export default About;