import React from 'react';
import axios from 'axios';
import Kysimustik from './Kysimustik';
import {useState, useEffect} from 'react';
import {Link, Route} from 'react-router-dom';

const kysimustikudURL = 'http://localhost:3001/getKysimused';
const tekitaURL = 'http://localhost:3001/tekitaKysimustik';
const KysimustikuValik = () => {
    const [kysimustikud, setKysimustikud] = useState([]);
    const [selectedKysimustik, setSelectedKysimustik] = useState(0);
    const [kasutajaid, setKasutajaId] = useState(1);

    //Saada kasutajaid ja kysimustikid /tekitaKysimustik api kutsele (POST REQUEST!!!!!!)

    const kysimustikuNupp = (kysimustik_id) => {
        axios.post(tekitaURL, {kasutaja_id: kasutajaid, kysimustik_id: kysimustik_id}).then((response) => {
            if (response.data) {
                setSelectedKysimustik(kysimustik_id);
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
        return <Kysimustik kysimustik_id={kysimustik_id}/>
    };

    useEffect(() => {
        console.log(selectedKysimustik);
    }, [selectedKysimustik])


    return(
        <React.Fragment>
            {selectedKysimustik === 0 ? kuvaKysimustikud() : kuvaKysimustik(selectedKysimustik)}
        </React.Fragment>
    );
};

export default KysimustikuValik;