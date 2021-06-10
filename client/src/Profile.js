import axios from 'axios';
import {useEffect, useState} from 'react';
import { setAccessToken } from "./accessToken";
import { getAccessToken } from "./accessToken";
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import env from 'react-dotenv';
import { NavLink } from "react-router-dom";
import Profilecard from './Profilecard';

//import {useUserIdContext} from './App.js';
require('dotenv').config();

const currentProfileId = 21;
const profileUrl = "http://localhost:3001/getKasutaja";

const Profile = () => {

    //const {userId} = useUserIdContext();
    const [profiilAndmed, setProfiilAndmed] = useState({});

    useEffect(() => {

        const token = getAccessToken();

        const {id} = jwtDecode(token);

        axios.post('http://localhost:3001/getKasutaja', {
            kasutajaid: id
        }).then((response) => {
            setProfiilAndmed(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        console.log(profiilAndmed);
    }, [profiilAndmed]);

    return(
        <section className="profile-container">
            <Switch>
                <Profilecard/>
            </Switch>
            <section className="profile-data-header">
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
    );
}

export default Profile;