import axios from 'axios';
import {useEffect, useState} from 'react';
import { BrowserRouter as Switch } from 'react-router-dom';
import Profilecard from './Profilecard';

import {useUserContext} from './userContext';
require('dotenv').config();

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const Profile = () => {

    const [profiilAndmed, setProfiilAndmed] = useState({});
  
    const {userId} = useUserContext();

    useEffect(() => {
        if(userId !== undefined) {
            axios.post(`${SERVER_URL}/getKasutaja`, {
                kasutajaid: userId
            }).then((response) => {
                setProfiilAndmed(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
        
    }, [userId]);

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
    );
}

export default Profile;