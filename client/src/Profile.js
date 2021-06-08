import axios from 'axios';
import {useEffect, useState} from 'react';
import { setAccessToken } from "./accessToken";
import { getAccessToken } from "./accessToken";
import jwtDecode from 'jwt-decode';
import env from 'react-dotenv';
require('dotenv').config();

const currentProfileId = 21;
const profileUrl = "http://localhost:3001/getKasutaja";

const Profile = () => {
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
            <section className="profile-card">
                <h2>PILT</h2>
                <h2>PILT</h2>
                <h2>PILT</h2>
                <h2>Alex Nelke{profiilAndmed.eesnimi} {profiilAndmed.perenimi}</h2>
                <h4>Õpetaja{profiilAndmed.kasutajaroll}</h4>
                <br/>
                <button className="profile-button">Profiil</button>
                <button className="profile-button">Õppematerjalid</button>
                <button className="profile-button">Minu küsimustikud</button>
                <br/>
                <button className="profile-button">Muuda profiili</button>
            </section>
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