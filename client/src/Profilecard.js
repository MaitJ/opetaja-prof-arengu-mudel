import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { setAccessToken } from "./accessToken";
import { getAccessToken } from "./accessToken";
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import env from 'react-dotenv';
import { NavLink } from "react-router-dom";
import {useUserContext} from './userContext';


//require('dotenv').config();


const Profilecard = () => {

    const {userId} = useUserContext();
    const [profiilAndmed, setProfiilAndmed] = useState({});
    const [havePicture, setHavePicture] = useState(false);
    //const [imageAddr, setImageAddr] = useState("");
    //const {userId} = useUserContext();

    useEffect(() => {
        if(userId !== undefined) {
            axios.post('http://localhost:3001/getKasutaja', {
                kasutajaid: userId
            }).then((response) => {
                setProfiilAndmed(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }

       
        
    }, [userId]);

    const ImageAddr = "uploads/images/" + profiilAndmed.profilepicture + ".jpg";
    const defaultImageAddr = "uploads/images/defaultpic.png";

    useEffect(() => {
        if(profiilAndmed !== undefined) {
            console.log("PROFILEPIC: " + profiilAndmed.profilepicture);
            if(profiilAndmed.profilepicture != null || profiilAndmed.profilepicture != undefined) {
                setHavePicture(true);
            }
        }
    }, [profiilAndmed]);

    // useEffect(() => {
        
    // }, [profiilAndmed]);


    console.log(havePicture);

    return(
        <React.Fragment>
            <section className="profile-card">
                {havePicture ? <img src={process.env.PUBLIC_URL + ImageAddr} alt='profilepic'></img> : <img src={process.env.PUBLIC_URL + defaultImageAddr} alt='profilepic'></img>} 
                <h2>{profiilAndmed.eesnimi} {profiilAndmed.perenimi}</h2>
                <h4>{profiilAndmed.kasutajaroll}</h4>
                <br/>
                <NavLink className="profile-button" to="/profile">Profiil</NavLink>
                <NavLink className="profile-button" to="/oppematerjalid">Õppematerjalid</NavLink>
                <NavLink className="profile-button" to="/">Minu küsimustikud</NavLink>
                <NavLink className="profile-button" to='/muudaprofiili'>Muuda profiili</NavLink>
            </section>
        </React.Fragment>
    );

}

export default Profilecard;
