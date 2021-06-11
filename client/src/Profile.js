import axios from 'axios';
import {useEffect, useState} from 'react';
import { setAccessToken } from "./accessToken";
import { getAccessToken } from "./accessToken";
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import env from 'react-dotenv';
import { NavLink } from "react-router-dom";
import Profilecard from './Profilecard';

import {useUserContext} from './userContext';
require('dotenv').config();

const Profile = () => {

    const [profiilAndmed, setProfiilAndmed] = useState({});
  
    const {userId} = useUserContext();

    useEffect(() => {

        axios.post('http://localhost:3001/getKasutaja', {
            kasutajaid: userId
        }).then((response) => {
            setProfiilAndmed(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    // useEffect (() => {
    
    //     const token = getAccessToken();

    //     if (!token) {
    //         return true
    //     } else {
    //         const {id} = jwtDecode(token);
    //         setUserId(id);
    //     }
    // })

    useEffect(() => {
        console.log(profiilAndmed);
    }, [profiilAndmed]);

    return(
        <section className="profile-container">
            <Switch>
                <Profilecard/>
            </Switch>
            <section className="profile-data-header">
            {/* <section className="profile-card">
                <img src='https://via.placeholder.com/300.png/09f/fff' alt='profilepic'></img>
                <h2>{profiilAndmed.eesnimi} {profiilAndmed.perenimi}</h2>
                <h4>{profiilAndmed.kasutajaroll}</h4>
                <br/>
                <button className="profile-button">Profiil</button>
                <button className="profile-button">Õppematerjalid</button>
                <button className="profile-button">Minu küsimustikud</button>
                <br/>
                <Link to='/muudaprofiili' type='button' className="profile-button">Muuda profiili</Link>
            </section> */}
            <section className="profile-data-1">
                <h1 className="profiil">Profiil</h1>
            <section className="profile-data">
                <h4>Nimi: {profiilAndmed.eesnimi} {profiilAndmed.perenimi}</h4>
                <h4>Roll: {profiilAndmed.kasutajaroll}</h4>
                <h4>E-mail: {profiilAndmed.email}</h4>
                <h4>Töökoht: {profiilAndmed.tookoht} </h4>
                <h4>Telefon: {profiilAndmed.telefon} </h4>
            </section>
            </section>
        </section>
        </section>
    );
}

export default Profile;