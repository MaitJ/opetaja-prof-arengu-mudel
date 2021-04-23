import React, { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios';
import Kysimusteplokk from './Kysimusteplokk';
import Kysimus from './Kysimus';

const kysimused_url = "http://localhost:3001/getkysimused";
const kysimusedKuvamine = 10;

const Kysimustik = () => {
    const [kysimusedList, setKysimusedList] = useState([]);
    const [loading, isLoading] = useState(false);
    const [selectedPlokk, setKysimustePlokk] = useState(0);
    const [kuvatavKysimustePlokk, setKuvatavKysimustePlokk] = useState([]);
    const [kysimustePlokkSuurus, setKysimustePlokkSuurus] = useState([]);
    const [selectedAlamPlokk, setAlamPlokk] = useState(0);
    const [kasOnAlamPlokk, setKasOnAlamPlokk] = useState(false);
    const [praeguneKysimustePlokk, setPraeguneKysimustePlokk] = useState([]);

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

/*
    useEffect(() => {
        const kysimused_alamplokk = getKysimusedAlamplokkidena();
        const kuvatavadKysimused = kysimused_alamplokk.filter((kysimus) => {
            return kysimus.kysimusteplokk_id === selectedPlokk && kysimus.alamplokk_id === selectedAlamPlokk;
        });
        setKuvatavKysimustePlokk(kuvatavadKysimused);
        console.log(kasOnAlamPlokk);


    }, [selectedPlokk, kysimusedList, selectedAlamPlokk]);

    useEffect(() => {
        setPraeguneKysimustePlokk(getKysimusedAlamplokkidena());
        console.log(praeguneKysimustePlokk);
    }, [selectedPlokk]);
*/

/*    useEffect(() => {
        const kuvatavadKysimused = kysimusedList.filter((kysimus) => kysimus.kysimusteplokk_id === selectedPlokk);
        if (kuvatavadKysimused.length > kysimusedKuvamine) {
            const kysimused_alamplokk = getKysimusedAlamplokkidena();
            console.log(kysimused_alamplokk);
            const kuvatavadKysimusedAlamPlokk = kysimused_alamplokk.filter((kysimus) => {
                return kysimus.kysimusteplokk_id === selectedPlokk && kysimus.alamplokk_id === selectedAlamPlokk;
            });
            setKuvatavKysimustePlokk(kuvatavadKysimusedAlamPlokk);
        } else {
            setKuvatavKysimustePlokk(kuvatavadKysimused);
            setKasOnAlamPlokk(false);
        }


    }, [selectedPlokk, kysimusedList, selectedAlamPlokk]);
*/
/*
    const getKysimusedAlamplokkidena = () => {
        let plokiKysimused = kysimusedList.filter((kysimus) => kysimus.kysimusteplokk_id === selectedPlokk);
        const mituPlokki = Math.ceil(plokiKysimused.length / kysimusedKuvamine);
        let kuvatavadKysimused = [];
        for (let i = 0; i < mituPlokki; ++i) {
            for (let j = 0; j < kysimusedKuvamine; ++j) {
                if (plokiKysimused[j] !== undefined) {
                    kuvatavadKysimused = [...kuvatavadKysimused, {...plokiKysimused[j], alamplokk_id:i}];
                }
            }
            if (plokiKysimused.length > kysimusedKuvamine) {
                plokiKysimused.splice(0, 9);
            }
        }
        setKasOnAlamPlokk(true);
        return kuvatavadKysimused;
    }

*/

    /*const vahetaKuvatavaidKysimusi = () => {

        let kuvatavadKysimused = kysimusedList.filter((kysimus) => kysimus.kysimusteplokk_id === selectedPlokk);
        if (kuvatavadKysimused.length < kysimusedKuvamine) {
            setRemainingKysimused([]);
        }
        if (kuvatavadKysimused.length > kysimusedKuvamine) {
            if (remainingKysimused.length === 0) {
                let tempKuvatavadKysimused = [];
                for (let i = 0; i < kysimusedKuvamine; ++i) {
                    tempKuvatavadKysimused = [...tempKuvatavadKysimused, kuvatavadKysimused[i]];
                }
                let remainingKysimusedTemp = [];
                for (let i = kysimusedKuvamine; i < kuvatavadKysimused.length; ++i) {
                    remainingKysimusedTemp = [... remainingKysimusedTemp, kuvatavadKysimused[i]];
                }
                kuvatavadKysimused = tempKuvatavadKysimused;
                setRemainingKysimused(remainingKysimusedTemp);
            } else {
                if (remainingKysimused.length > kysimusedKuvamine) {
                    for (let i = 0; i < kysimusedKuvamine; ++i) {
                        kuvatavadKysimused = [...kuvatavadKysimused, remainingKysimused[i]];
                        const remainingKysimusedTemp = remainingKysimused.filter((kysimus) => kysimus.id !== remainingKysimused[i].id);
                        setRemainingKysimused(remainingKysimusedTemp);
                    }
                } else {
                    kuvatavadKysimused = remainingKysimused;
                    setRemainingKysimused([]);
                }
            }
        }
        setKuvatavKysimustePlokk(kuvatavadKysimused);
    };*/



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
            <Kysimusteplokk kysimused={kysimusedList}/>
            <div className="kysimus-button-container">
                {displayButtons()}
            </div>
        </section>
    );
}

export default Kysimustik;