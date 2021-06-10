import React from 'react';
import axios from 'axios';
import Kysimustik from './Kysimustik';
import { getAccessToken } from "./accessToken";
import jwtDecode from 'jwt-decode';
import {useState, useEffect} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Profilecard from './Profilecard';
// import {getAccessToken} from './accessToken';
// import jwtDecode from 'jwt-decode';

const kysimustikudURL = 'http://localhost:3001/getKysimused';
const tekitaURL = 'http://localhost:3001/tekitaKysimustik';
const KysimustikuValik = () => {
    const [kysimustikud, setKysimustikud] = useState([]);
    const [selectedKysimustik, setSelectedKysimustik] = useState(0);
    const [kasutajaid, setKasutajaId] = useState(0);
    const [profiilKysimustikId, setProfiilKysimustikId] = useState(0);


    useEffect(() => {
        const token = getAccessToken();
        const {id} = jwtDecode(token);
        if (id) {
            setKasutajaId(id);
        }
    }, [])


    //Saada kasutajaid ja kysimustikid /tekitaKysimustik api kutsele (POST REQUEST!!!!!!)

    //Response saada edasi Kysimustik komponendile

    const kysimustikuNupp = (kysimustik_id) => {
        axios.post(tekitaURL, {kasutaja_id: kasutajaid, kysimustik_id: kysimustik_id}).then((response) => {
            if (response.data.status) {
                setSelectedKysimustik(kysimustik_id);
                setProfiilKysimustikId(response.data.profiil_kysimustik_id);
                //testi
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        /*
        axios.get(kysimustikudURL).then((response) => {
            setKysimustikud(response.data);
        }).catch((error) => {
            console.log(error);
        });
        */
        axios.post(kysimustikudURL, {kysimustikud: true})
        .then((response) => {
            setKysimustikud(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);
    
    const kuvaKysimustikud = () => {
        return(
            <section className="kysimustikud-container">
                {
                    kysimustikud.map((kysimustik) => {
                        const {kysimustik_id, kysimustik_pealkiri} = kysimustik;
                        return(
                            <article className="kysimustik">
                                <h5>{kysimustik_pealkiri}</h5>
                                <button onClick={() => kysimustikuNupp(kysimustik_id)}>Täida</button>
                            </article>
                        );
                    })
                }
            </section>
        );
    };

    const kuvaKysimustik = (kysimustik_id) => {
        return <Kysimustik kysimustik_id={kysimustik_id} profiil_kysimustik_id={profiilKysimustikId}/>
    };



    return(
        <section className="profile-kysimustik">
            <Switch>
                <Profilecard/>
            </Switch>
            <section className="kysimustik-container">
                <React.Fragment>
                    {selectedKysimustik === 0 ? kuvaKysimustikud() : kuvaKysimustik(selectedKysimustik)}
                </React.Fragment>
            </section>
        </section>
    );
};

export default KysimustikuValik;