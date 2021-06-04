import axios from 'axios';
import {useEffect, useState} from 'react';

const currentProfileId = 1;
const profileUrl = "http://localhost:3001/getKasutaja";

const Profile = () => {
    const [profiilAndmed, setProfiilAndmed] = useState({});

    useEffect(() => {
        const selector = "?kasutaja_id=" + currentProfileId;
        axios.get(profileUrl + selector).then((response) => {
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
            <p>Profile page</p>
            <section className="profile-data">
                <h4>Nimi: {profiilAndmed.eesnimi} {profiilAndmed.perenimi}</h4>
                <h4>Roll: {profiilAndmed.kasutajaroll}</h4>
                <h4>E-mail: </h4>
                <h4>Töökoht: </h4>
                <h4>Telefon: </h4>
            </section>
        </section>
    );
}

export default Profile;