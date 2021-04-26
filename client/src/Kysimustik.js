import React, { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios';
import Kysimusteplokk from './Kysimusteplokk';

const kysimused_url = "http://localhost:3001/getkysimused";

const Kysimustik = () => {
    const [kysimusedList, setKysimusedList] = useState([]);
    const [loading, isLoading] = useState(false);
    const [selectedPlokk, setKysimustePlokk] = useState(0);

    useEffect(() => {
        isLoading(true);
        const plokkSelection = "?plokk=";
        axios.get(kysimused_url + plokkSelection + selectedPlokk)
        .then((response) => {
            setKysimusedList(response.data);
            isLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [selectedPlokk])


    if (loading) {
        return (
            <section className="kysimuse-container">
                <h3>Loading ...</h3>
            </section>
        );
    }

    const displayButtons = () => {
        if (selectedPlokk === 0) {
            return <button onClick={() => setKysimustePlokk(selectedPlokk + 1)}>Jargmine leht</button>;
        } else if (selectedPlokk === kysimusedList.length - 1) {
            return <button onClick={() => setKysimustePlokk(selectedPlokk - 1)}>Eelmine leht</button>;
        } else {
            return (
                <React.Fragment>
                    <button onClick={() => setKysimustePlokk(selectedPlokk - 1)}>Eelmine leht</button>
                    <button onClick={() => setKysimustePlokk(selectedPlokk + 1)}>Jargmine leht</button>
                </React.Fragment>
            );
        }
    };


    return(
        <section className="kysimused-container">
            <h3>Kysimused</h3>
            <form>
                <Kysimusteplokk kysimused={kysimusedList}/>
            </form>
        </section>
    );
}

export default Kysimustik;